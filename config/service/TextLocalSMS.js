const twilio = require("twilio")
//+12185267505
/*Twilio OTP implementaion start Here...*/
module.exports.sendOtpSMSCallback = function (data, callback) {
    var from = "+12185267505";
    var accountSid = process.env.accountSid;
    var authToken = process.env.authToken;
    
    console.log(data.countryCode + data.mobileNumber);
    var client = new twilio(accountSid, authToken);
    client.messages
        .create({
            from: from,
            to: data.countryCode + data.mobileNumber,
            // code: "hi",
            body: data.msg
    }, callback);

}

/*Twilio OTP implementaion end Here...*/
