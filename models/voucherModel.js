const { string } = require("joi");
const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    voucherAmount:{
        type: Number,
        required: true,
    },
    voucherCode:{
        type: String,
        required: true,
        unique:true
    },
    pin:{
        type: String,
        required: true,
        // unique:true
    },
	expireDate: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: "no"
    },
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});



module.exports = mongoose.model("voucherCode", schema);