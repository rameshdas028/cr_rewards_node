const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique:true
    },
	name: {
        type: String,
        required: true,
    },
    companyId:{
        type: Schema.Types.ObjectId, 
        ref: 'company',
        required: true,
    },
    email1:{
        type: String,
        required: true,
    },
    email2:{
        type: String,
        required: true,
    },
    brandId:{
        type: Schema.Types.ObjectId, 
        ref: 'brand',
        required: true,
    },
    orderItems:{
        type: Object,
        amount:{
            type: Number
        },
        quantity:{
            type: Number
        }
    }
    // uploadedFileLinks:[ {
    //     type: String,
    //     description: "Links of uploaded files",
    // }],
    // tasks: [{ type: Schema.Types.ObjectId, ref: 'taskModel'} ]
}, {
    strict: false,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});



module.exports = mongoose.model("bulkorder", schema);