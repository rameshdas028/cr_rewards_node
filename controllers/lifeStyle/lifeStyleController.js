const { celebrate, Joi } = require("celebrate");
const Razorpay = require('razorpay');
const lifeStyleModel = require("../../models/lifeStyleModel");
const local = require("../../config/local.json");
const emailService = require("../../config/service/emailService");
const messageService = require("../../config/service/TextLocalSMS");
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
        // let msg = `Hello, This is not a plain-text email</a>`
        // var data = {
        //     from: "noreply@credencerewards.com",
        //     to: ["chandan19@navgurukul.org","csahoo776@gmail.com","loksudanbaidya01@gmail.com"],// where you sending...
        //     bcc: "loksudan@jobspri.com",
        //     subject: "hi, testing email", // subject...
        //     html: msg // message-> HTML message format can be send...
        // };
        // let sendDone = await emailService.sendEmail(data);
        // return res.send({
        //     status : 200,
        //     message: "done",
        //     data: sendDone
        // })
        let data = {
            countryCode: '+91',
            mobileNumber: '7586022804',
            msg: "hi"
        }
        messageService.sendOtpSMSCallback( data, async (resdata) => {
            console.log(resdata);
            // if (err) {
            //     console.log();
            //     // return res.json(helper.showTwillioErrorResponse(err.message));
            // }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });    
    }
}

/* 
1. upload cupon using excel
2. save cupon into data base
3. when getting item request check if cupon available if yes then status used then processed to payment and after payment confirm make the cupon as used and send cupon to the user.with invoice.
4. if not available then send invice after payment send notification to admin mark order status as pending .
*/
var multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})
 
var upload = multer({
    storage: storage
});

const reader = require('xlsx');
const csv = require('csv-parser')
const fs = require('fs')
const fileupload = require('express-fileupload');
exports.sendEmail = async(req,res) =>{
    try {
        let results = [];
        let email = [];
        let dataObj = {};
        fs.createReadStream('new.csv')
        .pipe(csv())
        .on('data', async(data) => results.push(data))
        .on('end', async() => {
            for(let i of results){
                email.push(i.email)
                let obj = {
                    subject:i.subject,
                    name:i.name
                }
                dataObj[i.email] = obj;
            }
            console.log(email);
            console.log(dataObj);
            var data = {
                from: "noreply@credencerewards.com",
                to: email,// where you sending...
                // bcc: "loksudan@jobspri.com",
                subject: '%recipient.subject%', // subject...
                html: 'Hey,recipient.name',
                'recipient-variables': dataObj,
                // html: msg // message-> HTML message format can be send...
            };

            let sendDone = await emailService.sendEmail(data);
            return res.send({
                status : 200,
                message: "done",
                data: sendDone
            })
        });
    } catch (error) {
        console.log(error);
    }
}

/* 

        let data = [
            {
                to: 'csahoo776@gmail.com', // replace this with your email address
                from: "noreply@credencerewards.com",
                subject: 'We miss you 😭',
                text: 'Get 10% off with coupon code NOMNOMNOM',
                html: '<p>Get 10% off with coupon code <b>NOMNOMNOM</b></p>',
              },
              {
                to: 'chandan19@navgurukul.org', // replace this with your email address
                from: "noreply@credencerewards.com",
                subject: 'NEW! Ube rolls 😻',
                text: 'In addition to donuts, we are now selling ube rolls.',
                html: '<p>In addition to donuts, we are now selling ube rolls.</p>',
              },
        ]
const message = {
  personalizations: [
    {
      to: [
        {
          email: 'john_doe@example.com',
          name: 'John Doe'
        },
        {
          email: 'julia_doe@example.com',
          name: 'Julia Doe'
        }
      ],
      cc: [
        {
          email: 'jane_doe@example.com',
          name: 'Jane Doe'
        }
      ],
      bcc: [
        {
          email: 'james_doe@example.com',
          name: 'Jim Doe'
        }
      ]
    },
    {
      from: {
        email: 'sales@example.com',
        name: 'Example Sales Team'
      },
      to: [
        {
          email: 'janice_doe@example.com',
          name: 'Janice Doe'
        }
      ],
      bcc: [
        {
          email: 'jordan_doe@example.com',
          name: 'Jordan Doe'
        }
      ]
    }
  ],
  from: {
    email: 'orders@example.com',
    name: 'Example Order Confirmation'
  },
  replyTo: {
    email: 'customer_service@example.com',
    name: 'Example Customer Service Team'
  },
  subject: 'Your Example Order Confirmation',
  content: [
    {
      type: 'text/html',
      value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'
    }
  ],
  attachments: [
    {
      content: 'PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==',
      filename: 'index.html',
      type: 'text/html',
      disposition: 'attachment'
    }
  ],
  categories: [
    'cake',
    'pie',
    'baking'
  ],
  sendAt: 1617260400,
  batchId: 'AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl',
  asm: {
    groupId: 12345,
    groupsToDisplay: [
      12345
    ]
  },
  ipPoolName: 'transactional email',
  mailSettings: {
    bypassListManagement: {
      enable: false
    },
    footer: {
      enable: false
    },
    sandboxMode: {
      enable: false
    }
  },
  trackingSettings: {
    clickTracking: {
      enable: true,
      enableText: false
    },
    openTracking: {
      enable: true,
      substitutionTag: '%open-track%'
    },
    subscriptionTracking: {
      enable: false
    }
  }
}; */