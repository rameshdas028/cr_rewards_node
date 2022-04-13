const { string, object } = require("joi");
const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    data: {
        type: Object
    }
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});



module.exports = mongoose.model("voucher_history", schema);