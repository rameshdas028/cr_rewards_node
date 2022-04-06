const bcrypt = require("bcryptjs");
const { celebrate, Joi } = require("celebrate");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/userModel");
const mongoose = require("../config/db");


module.exports.userRegistratioValidator = (req, res, next) => {
    const bodyValidation = Joi.object().keys({
            mobile: Joi.number().integer().min(1000000000).max(9999999999).required(),
            password: Joi.string().min(5).max(8).required(),
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

exports.signUp = async(req, res) => {
    try {
        const id = new mongoose.Types.ObjectId()
        let mobile = req.body.mobile;
        var Users = new usersModel({
			_id: id,
            mobile: mobile,
            password: req.body.password
        });
        
        let q = { mobile: mobile };     
        let data = await usersModel.findOne(q);

        // User already available - check firebase token in case of social true pending
        if (data) {
           console.log("Account already exists!");
            res.status(400).send({
                status: 400,
                message: "Account already exists! try signin!"
            });
        } else {
            Users.password = await bcrypt.hash(req.body.password,3);
            data = await Users.save();
            let token = jwt.sign({ Users }, "secret");
            res.cookie("token", token);
            res.send({
                message: "Created account",
                _id: Users._id,
                token: token,
                status: 200
            });
        }
    } catch (err) {
       console.log("Error while signup " + err);
        res.status(500).send({
            message: err.message || "Some error occurred while signup",
            status: 500,
        });
    }
};

exports.login = async (req, res) => {
        try {
            const { mobile, password } = req.body;
            const user = await usersModel.findOne({ mobile }).lean();
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "user not found",
                });
            }
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(404).json({
                    status: 404,
                    message: "Invalid Password",
                });
            }

            let token = jwt.sign({ user }, "secret");
            res.cookie("token", token);
            // const { token, permission } = tokenData;

            return res.status(200).json({
                status: 200,
                message: `login successfully`,
                _id: user._id,
                token: token,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    }



