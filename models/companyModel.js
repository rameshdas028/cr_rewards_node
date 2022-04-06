const mongoose = require("../config/db");
const Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    company_name: {
        desc: "The company's name.",
        trim: true,
        type: String,
        required: true,
    },
    person_name: {
        desc: "The person's name.",
        trim: true,
        type: String,
        required: true,
    },
    uid:{
        type: String,
        required: true,
    },
    cin:{
        type: String,
        required: true,
    },
    pan:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    mobile: {
        desc: "contact no of school's'",
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    addressLine1: {
        desc: "address of company",
        type: String,
        required: true, // there saying commented out for onboarding
    },
    addressLine2: {
        desc: "address of company",
        type: String,
    },
    pincode: {
        desc: "pincode",
        type: Number,
        required: true,
    },
    gstin: {
        desc: "description for the school",
        type: String,
    }
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = mongoose.model("company", schema);