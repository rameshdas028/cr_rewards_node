const DOMAIN = process.env.MAILGUN_DOMAIN;
var api_key = process.env.MAILGUN_API_KEY;
// var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);

const client = mailgun.client({ username: 'api', key: api_key || '' });
(async () => {
  try {
    const listsArray = await client.lists.list();
    console.log('lists', listsArray);
  } catch (error) {
    console.error(error);
  }
})();



sendCompleteTripEmailToDriverAndCustomer: async (data) => {

    var eBody = '';

    eBody += '<div style="padding: 20px;">';
    eBody += '<h1 style="display: inline-block; width: 100%;margin-bottom: 0;"><strong style="float: left;">Total Cost: </strong>';
    eBody += '<strong style="float: right;"> ₦' + costbeforPromo + '</strong>';
    eBody += '</h1>';

    eBody += '<hr style="margin-top: 25px; margin-bottom: 25px; border-color:#f9f9f9;float: left;width: 100%;">';

    eBody += '<p style="font-size: 20px;margin-top: 0px; margin-bottom:25px; float: left;">Thanks for riding with us.:' + datad.customerName + '</p>';

    eBody += '<hr style="margin-top: 25px; margin-bottom: 25px; border-color:#f9f9f9;width: 100%;">';

    eBody += '<p style="font-size: 20px; margin: 16px 0; display: table; width: 100%;float: left;">';
    eBody += '<strong style="display: table-cell; vertical-align: top; padding-right: 35px;width: 135px;"> Driver: </strong>';
    eBody += '<span style="display: table-cell;float: right;">' + datad.driverName + '</span>';
    eBody += '</p>';

    eBody += '<p style="font-size: 20px; margin: 16px 0; display: table; width: 100%;float: left;">';
    eBody += '<strong style="display: table-cell; vertical-align: top; padding-right: 35px;width: 135px;"> Car Type: </strong>';
    eBody += '<span style="display: table-cell;float: right;"> ' + datad.carTypeRequired.carType + '</span>';
    eBody += '</p>';

    eBody += '<p style="font-size: 20px; margin: 16px 0; display: table; width: 100%;float: left;">';
    eBody += '<strong style="display: table-cell; vertical-align: top; padding-right: 35px;width: 135px;"> Starting Point: </strong>';
    eBody += '<span style="display: table-cell;float: right;">' + datad.startLocationAddr + '</span>';
    eBody += '</p>';

    eBody += '<p style="font-size: 20px; margin: 16px 0; display: table; width: 100%;float: left;">';
    eBody += '<strong style="display: table-cell; vertical-align: top; padding-right: 35px;width: 135px;"> End Point: </strong>';
    eBody += '<span style="display: table-cell;float: right;">' + datad.endLocationAddr + '</span>';
    eBody += '</p>';

    eBody += '<hr style="margin-top: 25px; margin-bottom: 25px; border-color:#f9f9f9;float: left;width: 100%;">';

    eBody += '<p style="font-size: 20px;margin: 16px 0;display: table;float: left;float: left;">Bill Details</p>';

    eBody += '<p style="font-size: 20px;margin: 16px 0;display: table;width: 100%;float: left;">Your trip: <span style="font-size: 22px; float: right;">₦' + costbeforPromo + '</span></p>';

    eBody += '<hr style="margin-top: 25px; margin-bottom: 25px; border-color:#f9f9f9;float: left;width: 100%;">';

    if (datad.promoCodeCost != 0) {
        eBody += '<p style="font-size: 20px;margin: 16px 0;display: table;width: 100%;float: left;">Discount: <span style="font-size: 22px; float: right;">₦' + Math.round(datad.promoCodeCost * 100) / 100 + '</span></p>';
    }

    eBody += '<p style="font-size: 20px;margin: 16px 0; display: table;width: 100%;float: left;">';
    eBody += '<strong>Total Bill: </strong>';
    eBody += '<strong style="font-size: 22px; float: right;">₦' + Math.round(datad.cost * 100) / 100 + '</strong>';
    eBody += '</p>';

    eBody += '</div>';

    return eBody;
   


    
}