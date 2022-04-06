const mongoose = require("../config/db");
const userModel = require("./userModel");
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'userModel'} , //gardian
    name: {
        desc: "The patient's name.",
        trim: true,
        type: String,
        required: true,
        text: true
    },
    age:{
        desc: "age ",
        type: Number,
        required: true,
    },
    height:{
        type: String,
        required: true,
    },
    weight:{
        type: String,
        required: true,
    },
    blood_group:{
        type: String,
        required: true,
    },
    problem:{
        type: String,
        required: true,
    },
    contact: {
        desc: "contact no of school's'",
        type: Number,
        required: true,
    },
    state: {
        desc: "state of school", //
        type: String,
        required: true,
    },
    city: {
        desc: "city where the school is located",
        type: String,
        required: true,
    },
    pincode: {
        desc: "pincode",
        type: Number,
        required: true,
    },
    emergencyContact: {
        desc: "description for the school",
        type: String,
    }
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = mongoose.model("School", schema);