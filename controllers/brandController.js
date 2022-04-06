const { celebrate, Joi } = require("celebrate");
const brandModel = require("../models/brandModel");


module.exports.brandValidator = (req, res, next) => {
    const bodyValidation = Joi.object().keys({
        brandName: Joi.string().required(),
    }).unknown(false)
    
    const bodyValues = bodyValidation.validate(req.body);

    if (bodyValues.error) {
        return res.status(400).json({
            status: 400,
            message: bodyValues.error.details
        });
    };
    return next();
};

exports.createBrand = async(req, res) => {
    try {
        await brandModel.create(req.body);
        return res.send({
            status: 201,
            message: "create successfully",
            data: req.body
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}

exports.brandListForDropDown = async(req,res) => {
    try {
        let allCompanies = await brandModel.find().select({
            brandName: 1
        });
        res.send({
            status:200,
            message: "all brands",
            data: allCompanies
        })
    } catch (error) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}



