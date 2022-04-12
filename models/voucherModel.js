const { string } = require("joi");
const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    pin: {
        type: String,
        required: true,
        unique:true
    },
	expire: {
        type: Date,
        required: true,
    },
    amount:{
        type: Number,
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



module.exports = mongoose.model("voucher", schema);