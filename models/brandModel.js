const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
	brandName: {
        type: String,
        required: true,
    },
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});



module.exports = mongoose.model("brand", schema);