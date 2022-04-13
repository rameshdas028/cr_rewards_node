const { celebrate, Joi } = require("celebrate");
const Razorpay = require('razorpay');
const lifeStyleModel = require("../../models/lifeStyleModel");
const local = require("../../config/local.json");
const emailService = require("../../config/service/emailServiceSendGrid");
const mailGunService = require("../../config/service/emailServiceMailGun");
const messageService = require("../../config/service/TextLocalSMS");
const mongoose = require("../../config/db");
const lifestyleValidation = require("../../validation/lifeStyleValidation");
const orderModel = require("../../models/orderModel");
const itemModel = require("../../models/orderItemModel");
const voucherModel = require("../../models/voucherModel");
const voucher_history = require("../../models/vooucherHistory");
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
        
        if(total >= 1000000){
          return res.send({
              status:401,
              message: " You can perches maximum 10000 at a time "
          }) 
        }

        let items = await itemModel.create(arrayOfObject);
    
        let discount = (total - (total * (10/100))) * 100;

        let ax = await instance.orders.create({
            amount: discount,
            currency: "INR",
        })

        let dataForOrderItem = {
            _id: mongoose.Types.ObjectId(),
            orderId: ax.id,
            processId:payload.processId,
            orderItem : ids,
            discount: discount,
            status: ax.status
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
        let order_id = req.params.id;
        let order = await orderModel.findOne({orderId: order_id});
        if(!order){
            return res.send({
                status: 401,
                message: "invalid"
            })
        }
  
        let getUser = await lifeStyleModel.findOne({_id:order.processId});
        let getQuantity = await itemModel.find({processId:order.processId});

        let checkTotalVoucherLeft = await voucherModel.find({status:"no"}).count()
        let countVoucherOf1000 = await voucherModel.find({amount:1000,status:"no"}).count();
        let countVoucherOf2000 = await voucherModel.find({amount:2000,status:"no"}).count();
  
        let dataOfVoucher = [];
        let collectionOfUser = [];
        if(checkTotalVoucherLeft > 0){
          let obj = {
            to: "chandan19@navgurukul.org", // replace this with your email address
            // bcc:"Poorvi@credencerewards.com",
            from: "webmaster@credencerewards.com",
            msg: `${checkTotalVoucherLeft} voucher is left !`,
            subject: 'credencerewards cupon',
            html:`<p><p>`
          }
          await mailGunService.sendEmail(obj);
          console.log("email sent");
        }

        else if(countVoucherOf1000 <= 0){
          let obj = {
            to: "chandan19@navgurukul.org", // replace this with your email address
            // bcc:"Poorvi@credencerewards.com",
            from: "webmaster@credencerewards.com",
            msg: `1000 ${countVoucherOf1000} vocher is left !`,
            subject: 'credencerewards cupon',
            html:`<p><p>`
          }
          await mailGunService.sendEmail(obj);
        }

        else if(countVoucherOf2000 <= 0){
          let obj = {
            to: "chandan19@navgurukul.org", // replace this with your email address
            // bcc:"Poorvi@credencerewards.com",
            from: "webmaster@credencerewards.com",
            msg: `2000 ${countVoucherOf2000} vocher is left !`,
            subject: 'credencerewards cupon',
            html:`<p><p>`
          }
          await mailGunService.sendEmail(obj);
        }

  
        // console.log(dataOfVoucher);
        // let getVoucher = await voucherModel.find();

        // let getOrder = await instance.orders.fetch(order_id)
        // console.log();
        // await orderModel.findByIdAndUpdate({_id:order_id},{status:getOrder.status},{upsert: true});
        // var expectedSignature = crypto.createHmac('sha256', process.env.key_secret)
        //                                 .update(payload.order_id.toString())
        //                                 .digest('hex');

        // let response = {"status": 401, message:"faild"};
        // if(expectedSignature === order.signature)

        //     response={"status": 200, message:"success"}
                
      
        for(let i of getQuantity){
          let getVoucher = await voucherModel.find({amount:i.amount, status: "no"}).limit(i.quantity);
          if(i.quantity === getVoucher.length){
            for(let j of getVoucher){
              let data = {
                pin: j.pin,
                amount: j.amount,
                expire: j.expire
              }
              // await voucherModel.findByIdAndUpdate({_id:j._id},{status:"used"});
              dataOfVoucher.push(data);
            }
          }
          collectionOfUser.push(i);
        }
        await voucher_history.create(collectionOfUser);
        return res.send(dataOfVoucher);
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


const reader = require('xlsx');
const helper = require('../../helpers/helper');
exports.sendEmail = async(req,res) =>{
    try {
      let readfile = reader.readFile("./FORMAT.xls")
      let sheet = readfile.SheetNames;
      let sheetData;
      for(let i = 0; i< sheet.length; i++){
        const sheetnams = sheet[i];
        sheetData = reader.utils.sheet_to_json(readfile.Sheets[sheetnams]);
      }

      let data = [];
      for(let i = 0; i< sheetData.length; i++){
          let customerData = {
            name: sheetData[i].EmployeeName,
            amount: sheetData[i].value,
            number: sheetData[i].Code,
            pin: sheetData[i].Pin,
            expiry: sheetData[i].validity
          }
          let temp = await helper.sendEmailToCustomerTemplate(customerData);

          let obj = {
              to: sheetData[i].EmailIdOfficial, // replace this with your email address
              bcc:"Poorvi@credencerewards.com",
              from: "webmaster@credencerewards.com",
              subject: 'credencerewards cupon',
              html: temp,
          }
          data.push(obj)
      }
 
      let sendDone = await emailService.sendEmail(data);

      return res.send({
          status : 200,
          message: "sent successfully",
      })

    } catch (error) {
      res.send({
        status: 500,
        message:error
      })
    }
}


exports.sendEmailWithMailGun = async(req,res) =>{
  try {
    let readfile = reader.readFile("./FORMAT.xls")
    let sheet = readfile.SheetNames;
    let sheetData;
    for(let i = 0; i< sheet.length; i++){
      const sheetnams = sheet[i];
      sheetData = reader.utils.sheet_to_json(readfile.Sheets[sheetnams]);
    }

    let data = [];
    for(let i = 0; i< sheetData.length; i++){
      // console.log(sheetData[i]);
        let customerData = {
          name: sheetData[i].EmployeeName,
          amount: sheetData[i].value,
          number: sheetData[i].Code,
          pin: sheetData[i].Pin,
          expiry: sheetData[i].validity
        }
        let temp = await helper.sendEmailToCustomerTemplate(customerData);

        let obj = {
            to: [sheetData[i].EmailIdOfficial,sheetData[i].EmailIdPersonal], // replace this with your email address
            bcc:"poorvi@credencerewards.com",
            from: "webmaster@credencerewards.com",
            subject: 'credencerewards coupon',
            html: temp,
        }
        let sendDone = await mailGunService.sendEmail(obj);
    }
    return res.send({
        status : 200,
        message: "sent successfully",
    })

  } catch (error) {
    res.send({
      status: 500,
      message:error
    })
  }
}
