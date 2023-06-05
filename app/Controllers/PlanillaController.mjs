import {
    Empleado,
    Planilla,
    PlanillaEmpleado,
    DeduccionEmpleado,
    CondicionesDeduccion,
    TipoDeduccion,
    BonosPlanillaEmpleado,
    DeduccionPlanillaEmpleado,
    TipoBono,
    DocumentoEmpleado,
    Documento,
    TipoDocumento,
    PuestoTrabajoDependencia,
    PuestoTrabajo,
    Dependencia,
    TipoDependencia,
} from "../models/index.mjs";
import HttpCode from "../../configs/HttpCodes.mjs";
import Sequelize, { Op } from "sequelize";
import DB from "../DB/connection.mjs";
import moment from "moment";

export default class PlanillaController {
    static calcularPorcentaje(valor, porcentaje) {
        const resultado = valor * (porcentaje / 100);
        return parseFloat(resultado.toFixed(2));
    }
    static getDesc(infoEmpleado, id_tipo_deduccion) {
        if (id_tipo_deduccion == 1) {
            return infoEmpleado.DocumentoEmpleados.find(
                (x) => x.Documento.id_tipo_documento == 4
            ).numero_documento_empleado;
        } else if (id_tipo_deduccion == 2) {
            return infoEmpleado.DocumentoEmpleados.find(
                (x) => x.Documento.id_tipo_documento == 2
            ).numero_documento_empleado;
        } else if (id_tipo_deduccion == 3) {
            return infoEmpleado.DocumentoEmpleados.find(
                (x) => x.Documento.id_tipo_documento == 3
            ).numero_documento_empleado;
        } else {
            return null;
        }
    }
    static getMontoByCondiciones(condiciones, valor) {
        const condicion = condiciones.find((x) => {
            const desde = parseFloat(x.desde) <= parseFloat(valor);
            const hasta = !!x.hasta ? parseFloat(x.hasta) >= valor : true;
            if (desde && hasta) {
                return x;
            }
        });
        const primerCalculo = valor - parseFloat(condicion.sobre_exceso);
        const resultado =
            PlanillaController.calcularPorcentaje(
                primerCalculo,
                condicion.porcentaje
            ) + parseFloat(condicion.mas_cuota_fija);
        return parseFloat(resultado.toFixed(2));
    }
    static getMontoBonus(infoBono, valor, salario) {
        if (infoBono.porcentual) {
            return PlanillaController.calcularPorcentaje(
                salario,
                !!infoBono.valor ? infoBono.valor : valor
            );
        } else {
            return !!infoBono.valor ? parseFloat(infoBono.valor) : parseFloat(valor);
        }
    }
    static getSalary(infoEmpleado, inicio, fin) {
        const inicioEmpleado = moment(infoEmpleado.fecha_inicio, "YYYY-MM-DD").tz("America/El_Salvador");
        const inicioMes = moment(inicio, "YYYY-MM-DD").startOf('day');
        const finMes = moment(fin, "YYYY-MM-DD").endOf('day');
        const daysMonth = finMes.diff(inicioMes, 'days') + 1
        const salarioByDay = parseFloat(infoEmpleado.salario) / daysMonth
        let salario = 0
        if (inicioEmpleado.isBefore(inicioMes)) {
            if (!!infoEmpleado.fecha_fin) {
                const finEmpleado = moment(infoEmpleado.fecha_fin, "YYYY-MM-DD").tz("America/El_Salvador")
                const totalDiasTrabajados = finEmpleado.diff(inicioMes, 'days') +1
                salario = parseFloat(totalDiasTrabajados * salarioByDay)
            } else {
                const totalDiasTrabajados = finMes.diff(inicioMes, 'days') +1
                salario = parseFloat(totalDiasTrabajados * salarioByDay)
            }
        } else {
            if (!!infoEmpleado.fecha_fin) {
                const finEmpleado = moment(infoEmpleado.fecha_fin, "YYYY-MM-DD").tz("America/El_Salvador")
                const totalDiasTrabajados = finEmpleado.diff(inicioEmpleado, 'days') +1
                salario = parseFloat(totalDiasTrabajados * salarioByDay)
            } else {
                const totalDiasTrabajados = finMes.diff(inicioEmpleado, 'days') +1
                salario = parseFloat(totalDiasTrabajados * salarioByDay)
            }
        }
        return salario.toFixed(2)
    }
    static async store(req, res) {
        const connection = DB.connection();
        const t = await connection.transaction();
        try {
            const { anio_mes, array_bonos } = req.body;
            var ultimaFechaMes = moment(anio_mes, "YYYY-MM")
                .tz("America/El_Salvador")
                .endOf("month")
                .format("YYYY-MM-DD");
            var primeraFechaMes = moment(anio_mes, "YYYY-MM")
                .tz("America/El_Salvador")
                .startOf("month")
                .format("YYYY-MM-DD");
            const mes = moment(anio_mes, "YYYY-MM").month() + 1;
            const anio = moment(anio_mes, "YYYY-MM").year();
            const empleadosX = await Empleado.findAll({
                attributes: ["id_empleado", "salario", "fecha_fin", "fecha_inicio"],
                include: [
                    {
                        required: false,
                        model: DeduccionEmpleado,
                        where: {
                            activo: true,
                        },
                    },
                    {
                        required: true,
                        attributes: ["numero_documento_empleado"],
                        model: DocumentoEmpleado,
                        include: {
                            attributes: ["id_tipo_documento"],
                            required: true,
                            model: Documento,
                        },
                    },
                ],
                where: {
                    [Op.or]: [
                        { fecha_fin: null },
                        {
                            fecha_fin: {
                                [Op.between]: [primeraFechaMes, ultimaFechaMes],
                            },
                        },
                    ],
                },
            });
            const empleados = empleadosX.map((x)=>{
                //calculo si el empleado entro a fin de mes, si ya no trabaja y calculo su salario en base a los dias trabajados.
                x.salario = PlanillaController.getSalary(x, primeraFechaMes, ultimaFechaMes)
                return x
            })
            const tipos_Bonos = await TipoBono.findAll();
            const tipos_deducciones = await TipoDeduccion.findAll({
                include: [
                    {
                        model: CondicionesDeduccion,
                    },
                ],
            });
            const planilla = await Planilla.create(
                {
                    anio_planilla: anio,
                    fecha_elaboracion: new Date(),
                    mes_planilla: mes,
                    procesada: false,
                },
                { transaction: t }
            );
            const dataPlanillaEmpleadoCreate = [];
            for (const empleado of empleados) {
                dataPlanillaEmpleadoCreate.push({
                    id_empleado: empleado.id_empleado,
                    id_planilla: planilla.id_planilla,
                    total_neto: empleado.salario,
                });
            }
            const planilla_empleados = await PlanillaEmpleado.bulkCreate(
                dataPlanillaEmpleadoCreate,
                { transaction: t }
            );
            const dataDeduccionPlanillaEmpleado = [];
            const dataBonoPlanillaEmpleado = [];
            const deduccionesLey = tipos_deducciones.filter((x) => x.es_ley == true);
            for (const p_empleado of planilla_empleados) {
                const infoEmpleado = empleados.find(
                    (x) => x.id_empleado == p_empleado.id_empleado
                );
                //1ro. recorro los que son de ley
                for (const deduccion_ley of deduccionesLey) {
                    if (deduccion_ley.id_deduccion != 3) {
                        let monto = 0;
                        if (deduccion_ley.porcentual) {
                            monto = PlanillaController.calcularPorcentaje(
                                infoEmpleado.salario,
                                deduccion_ley.valor
                            );
                        } else {
                            monto = deduccion_ley.valor;
                        }
                        dataDeduccionPlanillaEmpleado.push({
                            id_planilla_empleado: p_empleado.id_planilla_empleado,
                            id_tipo_deduccion: deduccion_ley.id_deduccion,
                            monto,
                            descripcion_concepto: PlanillaController.getDesc(
                                infoEmpleado,
                                deduccion_ley.id_deduccion
                            ),
                        });
                    } else {
                        const infoISSS = deduccionesLey.find((x) => x.id_deduccion == 1);
                        const infoAFP = deduccionesLey.find((x) => x.id_deduccion == 2);
                        let valor =
                            parseFloat(infoEmpleado.salario) -
                            PlanillaController.calcularPorcentaje(
                                infoEmpleado.salario,
                                infoISSS.valor
                            ) -
                            PlanillaController.calcularPorcentaje(
                                infoEmpleado.salario,
                                infoAFP.valor
                            );
                        let monto = PlanillaController.getMontoByCondiciones(
                            deduccion_ley.CondicionesDeduccions,
                            valor
                        );
                        dataDeduccionPlanillaEmpleado.push({
                            id_planilla_empleado: p_empleado.id_planilla_empleado,
                            id_tipo_deduccion: deduccion_ley.id_deduccion,
                            monto,
                            descripcion_concepto: PlanillaController.getDesc(
                                infoEmpleado,
                                deduccion_ley.id_deduccion
                            ),
                        });
                    }
                }
                //2do.  veo los descuentos que tiene guardado el empleado.
                for (const empleado_deduccion of infoEmpleado.DeduccionEmpleados) {
                    dataDeduccionPlanillaEmpleado.push({
                        id_planilla_empleado: p_empleado.id_planilla_empleado,
                        id_tipo_deduccion: empleado_deduccion.id_tipo_deduccion,
                        monto: parseFloat(empleado_deduccion.monto),
                        descripcion_concepto: empleado_deduccion.descripcion_concepto,
                    });
                }
                //4ro. Agrego los bonos que vienen en el array.
                for (const bono of array_bonos) {
                    const isForAll = bono.empleados.includes("*");
                    const infoBono = tipos_Bonos.find(
                        (x) => x.id_tipo_bono == bono.id_tipo_bono
                    );
                    if (isForAll) {
                        const monto = PlanillaController.getMontoBonus(
                            infoBono,
                            bono.valor,
                            infoEmpleado.salario
                        );
                        dataBonoPlanillaEmpleado.push({
                            id_planilla_empleado: p_empleado.id_planilla_empleado,
                            id_tipo_bono: bono.id_tipo_bono,
                            monto,
                            descripcion_concepto: bono.descripcion_concepto,
                        });
                    } else {
                        const isForMe = bono.empleados.includes(p_empleado.id_empleado);
                        if (isForMe) {
                            const monto = PlanillaController.getMontoBonus(
                                infoBono,
                                bono.valor,
                                infoEmpleado.salario
                            );
                            dataBonoPlanillaEmpleado.push({
                                id_planilla_empleado: p_empleado.id_planilla_empleado,
                                id_tipo_bono: bono.id_tipo_bono,
                                monto,
                                descripcion_concepto: bono.descripcion_concepto,
                            });
                        }
                    }
                }
            }
            const deduccion_planilla_empleado =
                await DeduccionPlanillaEmpleado.bulkCreate(
                    dataDeduccionPlanillaEmpleado,
                    { transaction: t }
                );
            const bono_planilla_empleado = await BonosPlanillaEmpleado.bulkCreate(
                dataBonoPlanillaEmpleado,
                { transaction: t }
            );
            await t.commit();
            res.status(HttpCode.HTTP_CREATED).json({
                message: "Se creo con éxito la planilla",
            });
        } catch (e) {
            await t.rollback();
            console.log(e);
            throw e;
        }
    }
    static async index(req, res) {
        try {
            const { mes, anio } = req.query;
            const data_where = {};
            if (!!mes && !!anio) {
                data_where.mes_planilla = mes;
                data_where.anio_planilla = anio;
            } else if (!!anio) {
                data_where.anio_planilla = anio;
            } else if (!!mes) {
                data_where.mes_planilla = mes;
            }
            const data = await Planilla.findAll({
                where: data_where,
            });
            res.status(HttpCode.HTTP_OK).json(data);
        } catch (e) {
            throw e;
        }
    }
    static async indexDetalle(req, res) {
        try {
            const { busqueda } = req.query;
            const { id_planilla } = req.params;
            const data = await PlanillaEmpleado.findAll({
                include: [
                    {
                        required: true,
                        model:
                            !!busqueda && busqueda !== ""
                                ? Empleado.scope({ method: ["filtrarNombres", busqueda] })
                                : Empleado,
                    },
                ],
                where: {
                    id_planilla,
                },
            });
            const data_ordenado = data.map((x) => {
                return {
                    id_planilla_empleado: x.id_planilla_empleado,
                    id_planilla: x.id_planilla,
                    id_empleado: x.id_empleado,
                    total_neto: x.total_neto,
                    primer_nombre: x.Empleado.primer_nombre,
                    segundo_nombre: x.Empleado.segundo_nombre,
                    primer_apellido: x.Empleado.primer_apellido,
                    segundo_apellido: x.Empleado.segundo_apellido,
                    apellido_casada: x.Empleado.apellido_casada,
                    salario: x.Empleado.salario,
                    fecha_inicio: x.Empleado.fecha_inicio,
                    fecha_fin: x.Empleado.fecha_fin,
                };
            });
            res.status(HttpCode.HTTP_OK).json(data_ordenado);
        } catch (e) {
            throw e;
        }
    }
    static async indexDetalleEmpleado(req, res) {
        const { id_planilla_empleado } = req.params;
        const data = await PlanillaEmpleado.findOne({
            include: [
                {
                    required: true,
                    model: Empleado,
                    include: [
                        {
                            required: true,
                            model: PuestoTrabajoDependencia,
                            include: [
                                {
                                    required: true,
                                    model: PuestoTrabajo,
                                },
                                {
                                    required: true,
                                    model: Dependencia,
                                },
                            ],
                        },
                        {
                            required: true,
                            model: DocumentoEmpleado,
                            include: [
                                {
                                    required: true,
                                    model: Documento,
                                    where: {
                                        id_tipo_documento: 1,
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    model: DeduccionPlanillaEmpleado,
                    include: {
                        attributes: ["nombre_descuento", "es_ley"],
                        required: true,
                        model: TipoDeduccion,
                    },
                },
                {
                    model: BonosPlanillaEmpleado,
                    include: {
                        attributes: ["nombre"],
                        required: true,
                        model: TipoBono,
                    },
                },
            ],
            where: {
                id_planilla_empleado,
            },
        });
        const infoDependencia = await Dependencia.findOne({
            include: [
                {
                    model: TipoDependencia,
                },
            ],
            where: {
                id_dependencia: data.Empleado.PuestoTrabajoDependencium.id_dependencia,
            },
        });
        const nombre_dependencia = `${infoDependencia.TipoDependencium.nombre_tipo_dependencia} ${infoDependencia.nombre_dependencia}`;

        const data_clear = {
            id_planilla_empleado: data.id_planilla_empleado,
            id_planilla: data.id_planilla,
            id_empleado: data.id_empleado,
            total_neto: data.total_neto,
            id_empleado: data.Empleado.id_empleado,
            id_genero: data.Empleado.id_genero,
            id_profesion: data.Empleado.id_profesion,
            id_estado_civil: data.Empleado.id_estado_civil,
            id_municipio: data.Empleado.id_municipio,
            id_puesto_trabajo_dependencia: data.Empleado.id_puesto_trabajo_dependencia,
            primer_nombre: data.Empleado.primer_nombre,
            segundo_nombre: data.Empleado.segundo_nombre,
            primer_apellido: data.Empleado.primer_apellido,
            segundo_apellido: data.Empleado.segundo_apellido,
            apellido_casada: data.Empleado.apellido_casada,
            fecha_de_nacimiento: data.Empleado.fecha_de_nacimiento,
            numero_casa_apto: data.Empleado.numero_casa_apto,
            salario: data.Empleado.salario,
            barrio_colonia_residencial: data.Empleado.barrio_colonia_residencial,
            pasaje_senda: data.Empleado.pasaje_senda,
            calle_avenida: data.Empleado.calle_avenida,
            id_dependencia: data.Empleado.PuestoTrabajoDependencium.id_dependencia,
            salario_maximo: data.Empleado.PuestoTrabajoDependencium.salario_maximo,
            salario_minimo: data.Empleado.PuestoTrabajoDependencium.salario_minimo,
            fecha_inicio: data.Empleado.fecha_inicio,
            fecha_fin: data.Empleado.fecha_fin,
            id_dependencia: data.Empleado.PuestoTrabajoDependencium.id_dependencia,
            nombre_puesto_trabajo: data.Empleado.PuestoTrabajoDependencium.PuestoTrabajo.nombre_puesto_trabajo,
            jefatura: data.Empleado.PuestoTrabajoDependencium.jefatura,
            nombre_dependencia,
            documento_identidad: {
                nombre: data.Empleado.DocumentoEmpleados[0].Documento.nombre_documento,
                numero: data.Empleado.DocumentoEmpleados[0].numero_documento_empleado
            }
        };
        res.status(HttpCode.HTTP_OK).json(data_clear);
    }
}
