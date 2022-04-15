const mongoose = require("../config/db");
const Schema = mongoose.Schema;
/**
 *model for user roles
 */
const schema = new mongoose.Schema({
    orderId: {
        desc: "The user's name.",
        trim: true,
        type: String,
        index: true,
        required: true,
    },
    processId: {
        desc: "The user's email address.",
        trim: true,
        type: String,
        required: true,
    },
    orderItem:[
        { type: Schema.Types.ObjectId, ref: 'orderItemModel' }
    ],
    discount:{
        desc: "discount amount",
        trim: true,
        type: Number,
        required: true,
    },
    status:{
        desc: "order status",
        trim: true,
        type: String,
    },
    vouchers:{
        type: Schema.Types.Mixed
    },
    isDeledeliveredItem:{
        type: Boolean,
        default: false
    },
    signature:{
        desc: "signature",
        trim: true,
        type: String,   
    }
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = mongoose.model("order", schema);