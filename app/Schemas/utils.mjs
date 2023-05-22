const verifyDataExist = async (value, req, pk_name, model) => {
    const data = await model.findOne({
        where: {
            [pk_name]: value
        }
    })
    if (!!data) {
        return true
    } else {
        throw new Error(`No existe el dato.`)
    }

}
const callValidateFunc = (validationFn) => {
    return (...args) => (value, { req }) => {
        return validationFn(value, req, ...args);
    };

    // if (Array.isArray(validationFn)) {
    //     return (...args) => (value, { req }) => {
    //         for (const fn of validationFn) {
    //             const result = fn(value, req, ...args);
    //             if (result) {
    //                 return result;
    //             }
    //         }
    //     };
    // } else {
    //     return (...args) => (value, { req }) => {
    //         return validationFn(value, req, ...args);
    //     };
    // }
};


export { verifyDataExist, callValidateFunc }