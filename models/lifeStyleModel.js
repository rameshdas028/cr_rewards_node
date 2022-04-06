const mongoose = require("../config/db");
const Schema = mongoose.Schema;
/**
 *model for user roles
 */
const schema = new mongoose.Schema({
    name: {
        desc: "The user's name.",
        trim: true,
        type: String,
        required: true,
    },
    email: {
        desc: "The user's email address.",
        trim: true,
        type: String,
        // unique: true,
        // index: true,
        required: true,
    },
    mobile: {
        desc: "The user's mobile no",
        trim: true,
        type: Number,
        // index: true,
        // unique: true,
        required: true, //required for onboarding but not required for employees so commenting
        sparse: true,
    },
    companyName: {
        desc: "the companyName",
        trim: true,
        type: String,
    },
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = mongoose.model("lifestyle", schema);