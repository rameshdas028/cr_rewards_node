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
        // required: true,
    },
    // email: {
    //     desc: "The user's email address.",
    //     trim: true,
    //     type: String,
    //     unique: true,
    // },
    mobile: {
        desc: "The user's mobile no",
        trim: true,
        type: Number,
        index: true,
        unique: true,
        required: true, //required for onboarding but not required for employees so commenting
        sparse: true,
    },
    // dob: {
    //     type: Date,
    //     required: true,
    // },
    password: {
        desc: "the user's password",
        trim: true,
        required: true,
        type: String,
    },
    // isCustomRole: {
    //     type: Boolean,
    //     default: false
    // },
    // role: {
    //     desc: "the user's role",
    //     trim: true,
    //     type: String,
    //     // enum:["owner","Teacher","Co-Ordinator","Manager"] // TODO: think of any beter ways
    // },
    // imageUrl: {
    //     desc: "image link of the user",
    //     type: String,
    // },
    // address: {
    //     desc: "user's address.",
    //     trim: true,
    //     type: String,
    // },
    // designation: {
    //     desc: "designation type",
    //     type: String,
    //     // required: true,
    // },
    // gender: {
    //     desc: "user's gender",
    //     type: String
    // },
    // firstLogin: {
    //     desc: "Only for users other than Owner ",
    //     type: Boolean,
    //     default: false,
    // },
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = mongoose.model("user", schema);