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
const invoiceMailTemplate = require("../../helpers/peronalMail");
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

        let discount = (total - (total * (10/100)));
      
        let ax = await instance.orders.create({
            amount: discount,
            currency: "INR",
        })
        if(ax.status === 'created'){
          let items = await itemModel.create(arrayOfObject);

          let dataForOrderItem = {
            _id: mongoose.Types.ObjectId(),
            orderId: ax.id,
            processId:payload.processId,
            orderItem : ids,
            discount: (discount / 100),
            status: ax.status
        }

        let saveData = await orderModel.create(dataForOrderItem);
        
          res.send({
              status:200,
              orderId: saveData.orderId,
              processId: saveData.processId
          })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message:  error || "Internal Server Error",
        });   
    }
}

exports.paymentVerify = async(req,res) => {
    try {
        let order_id = req.params.id;
        let obj = {};
        let order = await orderModel.findOne({orderId: order_id, status: "created"});
        if(!order){
            return res.send({
                status: 401,
                message: "invalid"
            })
        }
        let getUser = await lifeStyleModel.findOne({_id:order.processId});
        let checkPyament = await instance.orders.fetch(order_id);
        console.log(checkPyament,"check payment");
        if((checkPyament.status).toLowerCase() === "paid"){
          if(checkPyament.amount_paid < 90000){
            obj = {
              to:  getUser.email, // replace this with your email address
              bcc: "chandan19@navgurukul.org",
              from: "webmaster@credencerewards.com",
              msg: ` voucher text `,
              subject: 'credencerewards voucher',
              html: `<p> dont have voucher for this amount. Sorry! for your lose  <p>`
            }
            await mailGunService.sendEmail(obj);
            return res.send({
              status: checkPyament,
              message: "successfull"
            });
          }else{
            let getQuantity = await itemModel.find({processId:order.processId, voucher_sent_status: false});
            let checkTotalVoucherLeft = await voucherModel.find({status:"no"}).count()
              // console.log(checkTotalVoucherLeft);
            // let countVoucherOf1000 = await voucherModel.find({voucherAmount:1000,status:"no"}).count();
              // console.log(countVoucherOf1000);
            // let countVoucherOf2000 = await voucherModel.find({voucherAmount:2000,status:"no"}).count();
      
  
            if(checkTotalVoucherLeft <= 1){
              obj = {
                to: "bhavik@credencerewards.com",
                bcc: "chandan19@navgurukul.org", // replace this with your email address
                // bcc:"Poorvi@credencerewards.com",
                from: "webmaster@credencerewards.com",
                msg: `${checkTotalVoucherLeft} voucher is left !`,
                subject: 'credencerewards cupon',
                html:`<p>Left voucher ${checkTotalVoucherLeft} <p>`
              }
              await mailGunService.sendEmail(obj);
              console.log("email sent");
            } 
            let dataOfVoucher = [];
            let collectionOfUser = [];
            let makObj2 = {
              name: getUser.name
            };
            let makObj = {
                name: getUser.name
            }
            let messageObj = {
              mobile: getUser.mobile
            }
            for(let i of getQuantity){
              let getVoucher = await voucherModel.find({voucherAmount:i.amount, status: "no"}).limit(i.quantity);
              if(getVoucher.length > 0 && i.quantity === getVoucher.length){
                for(let voucher of getVoucher){
                  let data = {
                      amount: voucher.voucherAmount,
                      code: voucher.voucherCode,
                      pin: voucher.pin,
                      expire: voucher.expireDate
                    }
                  await voucherModel.findByIdAndUpdate({_id:voucher._id},{status:"used"});
                  dataOfVoucher.push(data);
                }
              }
              collectionOfUser.push(i);
            }
            makObj.details = dataOfVoucher
            messageObj.details = dataOfVoucher;
            makObj2.details = collectionOfUser;
            let checkTotalSent = await voucherModel.find({status:"used"}).count()
            let total =  checkTotalVoucherLeft - checkTotalSent;
            if(makObj.details.length >= 1){
              let html = await invoiceMailTemplate.sendEmailToCustomer(makObj);
              obj = {
                to: getUser.email, // replace this with your email address
                bcc:"bhavik@credencerewards.com",
                from: "webmaster@credencerewards.com",
                msg: ` vaoucher`,
                subject: 'credencerewards voucher',
                html: html
              }
              await mailGunService.sendEmail(obj);
              console.log("email sent to client");
              obj = {
                to:  "bhavik@credencerewards.com", // replace this with your email address
                bcc: "chandan19@navgurukul.org",
                from: "webmaster@credencerewards.com",
                msg: ` Total voucher sent ${total}`,
                subject: 'credencerewards voucher',
                html: `<p>Total voucher used ${total} <p>`
              }
              await mailGunService.sendEmail(obj);
              console.log("email sent bhavik");
              await itemModel.findOneAndUpdate({processId:order.processId, voucher_sent_status: false },{
                voucher_sent_status: true
              });
              await orderModel.findOneAndUpdate({orderId: order_id},{status: "Paid"});
              await this.sendText(messageObj);
            }else{
              await voucher_history.create(makObj2);
              let needVoucher = collectionOfUser.length;
              obj = {
                to: "bhavik@credencerewards.com", // replace this with your email address
                bcc: "chandan19@navgurukul.org",
                from: "webmaster@credencerewards.com",
                msg: ` voucher need to send ${needVoucher}`,
                subject: 'credencerewards voucher',
                html: `<p>Total voucher used ${total} <p>`
              }
              await mailGunService.sendEmail(obj);
              console.log("email sent");
            }
            return res.send({
              status: checkPyament.status,
              message: "successfull"
            });
          }
        }else{
          return res.send({
            status: 401,
            message: "payment not done!"
          });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        }); 
    }
}

exports.sendText = async(data) => {
    try {
      let msg;
      for(let i of data.details){
          msg = ` This is your Lifestyle voucher of value INR Amount  ${i.amount}  Voucher Code  ${i.code}  Voucher pin  ${i.pin} Expire Date  ${i.expire}`
          let obj = {
            countryCode: '+91',
            mobileNumber: `${data.mobile}`,
            msg: msg
          }
          messageService.sendOtpSMSCallback(obj, async (resdata) => {
            console.log(resdata);
          })
      }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error",
        });    
    }
}

/* 
accountSid = "SK1748db093636200a2b84a3e3af6cff46"
authToken = "koyVx6xovM0RJtfKbEnIrHv7DP1dOsoY"
accountSid = "ACbb120ff004658fa724f81de4d364081f"
authToken = "177daf3ec941f4cf665b5fd3a0e73c75"
1. upload cupon using excel
2. save cupon into data base
3. when getting item request check if cupon available if yes then status used then processed to payment and after payment confirm make the cupon as used and send cupon to the user.with invoice.
4. if not available then send invice after payment send notification to admin mark order status as pending .
*/


const reader = require('xlsx');
const helper = require('../../helpers/helper');
const { json } = require("body-parser");
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


/*

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
*/