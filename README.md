
# Sistema de Planilla

API REST de Sistema de planilla para una empresa.


## Caracteristicas

- Full optimizado.
- PostgresSQL.
- JWT.
- Express.
- Sequelize.


## Instalación

Clonar el proyecto:
```bash
  git clone https://github.com/WalterPrz/sistema-planilla.git
```


Nos movemos al proyecto e instalamos las dependencias

```bash
  npm install 
```
Nos copiamos el archivo .env.example y lo renombramos como .env
```bash
  cp .env.example .env
```
Ingresamos las credenciales de la base de datos:
```bash
PORT=3000               #Puerto de la api.
APP_DEBUG=true          #si esta en producción poner false.
HOST=localhost          #dirección del servidor.
DB_HOST=localhost       #dirección ip de la base de datos.
DB_PORT=5432            #puerto de la base de datos.
DB_NAME=mydb            #nombre de la base de datos.
DB_USERNAME=myusername  #usuario de la base de datos
DB_PASSWORD=mypassword  #contraseña de la base de datos

JWT_SECRET=mysecret     #se recomienda generar una cadera llave privada.
JWT_EXPIRATION_TIME=60m #Tiempo de expiracion de la sesión.
REFRESH_EXPIRATION_TYPE=m #tipo de tiempo de duración de la sesión.(m = minutos)
REFRESH_EXPIRATION_TIME=120 #cantidad de tiempo máximo de duración de la sesión.
```
 Corremos la api

```bash
  npm run start 
```   
## API

#### Login

```http
  POST  /api/auth/login/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `correo_institucional` | `string` | **Required**. Correo|
| `clave` | `string` | **Required**. contraseña |



## Authors

- [Diana Serrano](es16014@ues.edu.sv)
- [Walter Pérez](pt18003@ues.edu.sv)
- [Walter Romero](rp18066@ues.edu.sv)
- [Enmanuel Conteras](cc17116@ues.edu.sv)
- [Benjamin Molina](mr18003@ues.edu.sv)
