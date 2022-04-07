//mailGun implementaion....

var from = MAILGUN_FROM;
var api_key = MAILGUN_API_KEY;
var domain = MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

var data = {
    from: from,
    to: to,// where you sending...
    subject: sub, // subject...
    html: msg // message-> HTML message format can be send...
};

mailgun.messages().send(data, function (error, body) {
    if (error) {
        //console.log('Mail gun error', error);
        return true;
    } else {
        //console.log('Mail gun send mesg success', body);
        return true;
    }
});
/*mailgun implementaion end Here...*/


/*Twilio OTP implementaion start Here...*/
module.exports.sendOtpSMSCallback = function (data, callback) {


    console.log("data===>", data);
    var from = twilioFrom;
    var accountSid = accountSid;
    var authToken = authToken;

    console.log(data.countryCode + data.mobileNumber);

    var client = new twilio(accountSid, authToken);

    // client.verify.services(data.serviceSid)
    //     // .verificationChecks


    client.messages
        .create({
            from: from,
            to: data.countryCode + data.mobileNumber,
            code: data.OTP,
            body: data.msg
        }, callback);

}

/*Twilio OTP implementaion end Here...*/