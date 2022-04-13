//mailGun implementaion....

/*mailgun implementaion end Here...*/

const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);
  module.exports.sendEmail = async(data) => {
    client
  .send(data)
  .then(() => console.log('Mail sent successfully'))
  .catch(error => {
    console.error(error);
  });
}