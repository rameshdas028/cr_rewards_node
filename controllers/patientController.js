const { celebrate, Joi } = require("celebrate");
const jwt = require("jsonwebtoken");
const patientModel = require("../models/patientModel");


exports.createPatient = [
    celebrate({
		body: Joi.object().keys({
            name: Joi.string().required(),
            age: Joi.number().integer().min(1000000000).max(9999999999).required(),
            height: Joi.string().length(8).required(),
            weight: Joi.string().length(8).required(),
            blood_group: Joi.string().length(3).required(),
            problem: Joi.string().required(),
            contact: Joi.number().integer().min(1000000000).max(9999999999).required(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            pincode:Joi.string().length(6).required(),
            emergencyContact:Joi.number().integer().min(1000000000).max(9999999999).required(),
		})
	}),
    async (req, res) => {
        try {

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }
];