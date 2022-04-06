const { celebrate, Joi } = require("celebrate");
const bulkOrderModel = require("../../models/bulkOrderModel");

module.exports.bulkOrderValidator = (req, res, next) => {
    const bodyValidation = Joi.object().keys({
        name: Joi.string().required(),
        companyId: Joi.string().required(),
        email1: Joi.string().required(),
        email2: Joi.string().required(),
        brandId: Joi.string().required(),
        amount: Joi.number().required(),
        quantity: Joi.number().required()
    }).unknown(false)
    
    const bodyValues = bodyValidation.validate(req.body);

    if (bodyValues.error) {
        return res.status(400).json({
            status: 400,
            message: bodyValues.error.details
        });
    };
    return next();
};

exports.createBulkOrder = async(req, res) => {
    try {

        let findOrder = await bulkOrderModel.findOne().sort( { createdAt : -1 } );

        let IdCount;
        if(findOrder == undefined){
            IdCount = 1;
        }else{
            IdCount = (findOrder.orderId) + 1;
        }

        let { body: payload } = req;
        let data = {
            "orderId":IdCount,
            "name":payload.name,
            "companyId": payload.companyId,
            "email1":payload.email1,
            "email2":payload.email2,
            "brandId": payload.brandId,
            "orderItems":{
                "amount": payload.amount,
                "quantity":payload.quantity
            }
        };
        await bulkOrderModel.create(data);
        return res.send({
            status: 201,
            message: "create successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

exports.listOfOrders = async(req,res) => {
    try {
        let findOrders = await bulkOrderModel.find().select({
            orderId:1,
            name:1,
            createdAt:1
        }).sort( { createdAt : -1 } );

        return res.send({
            status:200,
            message: "all orders",
            data: findOrders
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};

exports.viewOrder = async(req,res) => {
    try {
        let findOrders = await bulkOrderModel.findById({_id:req.params.id})
        .populate({
            path: "brandId",
            select: { brandName: 1}
         })
         .populate({
            path: "companyId",
            select:{ company_name:1 }
         }).select({createdAt:0,updatedAt:0}).lean();
         let total = (findOrders.orderItems.amount * findOrders.orderItems.quantity);
    
         findOrders.orderItems.total = total;
         return res.send({
            status:200,
            message: "view orders",
            data: findOrders
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}