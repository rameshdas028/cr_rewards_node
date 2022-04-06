const { celebrate, Joi } = require("celebrate");
const jwt = require("jsonwebtoken");
const companyModel = require("../models/companyModel");


module.exports.addCompanyValidator = (req, res, next) => {
    const bodyValidation = Joi.object().keys({
        company_name: Joi.string().required(),
        person_name: Joi.string().required(),
        uid:Joi.string().required(),
        cin:Joi.string().required(),
        pan:Joi.string().required(),
        mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
        email: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string(),
        pincode:Joi.string().length(6).required(),
        gstin:Joi.string().required(),
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

exports.createCompany = async(req, res) => {
    try {
        await companyModel.create(req.body);
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

exports.allCompanies = async(req,res) => {
    try {
        let allCompanies = await companyModel.find();
        res.send({
            status:200,
            message: "all companies",
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

exports.getSpecificCompany = async(req,res) => {
    try {
        let params = req.params.id;
        let allCompanies = await companyModel.findById({_id:params});
        res.send({
            status:200,
            message: "specific companie",
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


exports.companiesForDropDown = async(req,res) => {
    try {
        let allCompanies = await companyModel.find().select({
            company_name:1
        });
        res.send({
            status:200,
            message: "company list",
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