// var from = MAILGUN_FROM;
var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
//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
// "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"
module.exports.sendEmail = async(data) => {

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.log('Mail gun error', error);
            return true;
        } else {
            console.log('Mail gun send mesg success', body);
            return true;
        }
    });
}