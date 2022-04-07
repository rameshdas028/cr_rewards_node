const { celebrate, Joi } = require("celebrate");
const Razorpay = require('razorpay');
const lifeStyleModel = require("../../models/lifeStyleModel");
const local = require("../../config/local.json");
const TextLocalSMS = require("../../config/service/TextLocalSMS");
const mongoose = require("../../config/db");
const lifestyleValidation = require("../../validation/lifeStyleValidation");
const orderModel = require("../../models/orderModel");
const itemModel = require("../../models/orderItemModel");
var CryptoJS = require("crypto-js");
var crypto = require("crypto");
const instance = new Razorpay({ 
    key_id: process.env.key_id, 
    key_secret: process.env.key_secret 
});



exports.createLifeStyleUser = async(req, res) => {
    try {
        let {body: payload} = req;
        let { error } = await lifestyleValidation.addLifeStyleUserValidator(payload);
        if(error){
            return res.send({
                status: 400,
                message: error.details[0].message
            })
        }
        let lifestyle = {
            name: payload.name,
            mobile: payload.mobile,
            email: payload.email,
        };
        let data;  
        data = await lifeStyleModel.create(lifestyle);
        return res.send({
            status: 201,
            message: "create successfully",
            processId: data._id
        })
        
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 500,
            message: err || "Internal Server Error",
        });
    }
}

exports.getSuccessRes = async(req,res) => {
    try {
        return res.send({
            status: 200,
            data: {
                message: "thanl you",
               amount: "available amount " +local.lifeStyleResponse.amount
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error || "Internal Server Error",
        });
    }
}

exports.giveMessage = async(req,res) => {
    try {
        res.send({
            status:200,
            message: "you will get the gift card in your email shortly"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
}



exports.lifeStyleOrder = async(req,res) => {
    try {
        let {body: payload} = req;

        let { error } = await lifestyleValidation.lifeStyleOrderValidator(payload);
        console.log(error);
        if(error){
            return res.send({
                status: 400,
                message: error.details[0].message
            })
        }
        let lifestyleUser = await lifeStyleModel.findOne({_id: payload.processId});
        if(!lifestyleUser){
            return res.send({
                status:401,
                message: "processId invalid"
            })   
        }

        let total = 0;
        let ids = [];
        let arrayOfObject = [];
        for(let i of payload.items){
            let data = {
                _id : mongoose.Types.ObjectId(),
               processId: payload.processId,
               amount: i.amount,
               quantity: i.quantity
            };
            total += (i.amount * i.quantity) * 100;
            ids.push(data._id);
            arrayOfObject.push(data);
        }
  
        if((total/100) > 100000){
            return res.send({
                status:401,
                message: " You can perches maximum 100000 at a time "
            }) 
        }
        
        let items = await itemModel.create(arrayOfObject);
    
        let discount = (total - (total * (10/100))) * 100;

        let ax = await instance.orders.create({
            amount: discount,
            currency: "INR",
        })

        let signature = crypto.createHmac('sha256', process.env.key_secret)
        .update((ax.id).toString())
        .digest('hex');

        let dataForOrderItem = {
            _id: mongoose.Types.ObjectId(),
            orderId: ax.id,
            processId:payload.processId,
            orderItem : ids,
            discount: discount,
            status: ax.status,
            signature: signature
        }

        let saveData = await orderModel.create(dataForOrderItem);
   
        res.send({
            status:200,
            orderId: saveData.orderId,
            processId: saveData.processId
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });   
    }
}

exports.paymentVerify = async(req,res) => {
    try {
        // let {body: payload} = req;
        let order_id = req.params.id;

        let order = await orderModel.findOne({orderId: order_id});
        if(!order){
            return res.send({
                status: 401,
                message: "invalid"
            })
        }

        let getOrder = await instance.orders.fetch(order_id)
        // console.log();
        // await orderModel.findByIdAndUpdate({_id:order_id},{status:getOrder.status},{upsert: true});
        // var expectedSignature = crypto.createHmac('sha256', process.env.key_secret)
        //                                 .update(payload.order_id.toString())
        //                                 .digest('hex');

        // let response = {"status": 401, message:"faild"};
        // if(expectedSignature === order.signature)

        //     response={"status": 200, message:"success"}
                
        return res.send(getOrder);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        }); 
    }
}

exports.sendText = async(req,res) => {
    try {
        const axios = require("axios");
        let text_msg = `Thank You`;
        let toNumbers = ['918116576096'];

        // var url = `https://api.txtlocal.com/send/?apikey=<${encodeURIComponent('NzY0OTU1NjkzMTRmMzAzODZhNGQ0NjMyMzg2ZjQzNzc')}==>&numbers=<918116576096>&sender=${encodeURIComponent('TXTLCL')}&message=` + encodeURIComponent('OTP to login to app is 123456');
        // axios
        //     .get(url)
        //     .then(function (response) {
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //     console.log(error);
        // });
        // let smsService = new TextLocalSMS();
        let smsSent = TextLocalSMS.sendMessage({toNumber:"918116576096",msg:"thank you"})
        // console.log(smsSent);
        res.send({
            status: 200,
            data: smsSent
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });    
    }
}