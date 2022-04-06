const mongoose = require("../config/db");
const Schema = mongoose.Schema;
/**
 *model for user roles
 */
const schema = new mongoose.Schema({
    processId:{
        trim: true,
        type: String,
        required: true, 
    },
    amount:{
        desc: "total amount",
        trim: true,
        type: Number,
        required: true,
    },
    currency:{
        desc: "currency",
        trim: true,
        type: String,
    },
    quantity: {
        desc: "quantity",
        trim: true,
        type: Number,
        required: true,
    },
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = mongoose.model("item", schema);