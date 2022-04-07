const Joi  = require("joi");


module.exports.addLifeStyleUserValidator = async(payload) => {
    const bodyValidation = Joi.object().keys({
        name: Joi.string().required(),
        mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
        email: Joi.string().email().lowercase().required()
    }).unknown()

    return bodyValidation.validate(payload);
};

module.exports.lifeStyleOrderValidator = async(payload) => {
    const bodyValidation = Joi.object().keys({
        processId: Joi.string().required(),
        items: Joi.array().items({
            amount: Joi.number().required(),
            quantity: Joi.number().positive().required()
        })
    }).unknown()
    
    return bodyValidation.validate(payload);
};