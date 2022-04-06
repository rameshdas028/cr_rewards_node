// const axios = require("axios");
// const {URLSearchParams} = require('url')

// // const tlClient = axios.create({
// //   baseURL: "https://api.textlocal.in/",
// //   params: {
// //     apikey:'Nzg0Nzc3NmU1NzYxNGU0YzZkNGQzNjY1NTI0ZTQ4MzY=',
// //     sender: encodeURIComponent('TXTLCL')
// //   }
// // })
// // // .then((result) => {
// // //     console.log(result);
// // // }).catch((err) => {
// // //     console.log(err);
// // // });;

// // const smsClient = {
// //   sendPartnerWelcomeMessage: phone => {
// //     if (phone) {
// //       const params = new URLSearchParams();
// //       params.append("numbers", [parseInt("+91" + phone)]);
// //       params.append(
// //         "message",
// //         `Hi thank you,
// //             Welcome to iWheels, Download our app to get bookings from our customers with better pricing. 
// //             https://iwheels.co`
// //       );
// //       console.log(params);
// //       axios.post("https://api.textlocal.in/send",{
// //         apikey:'Nzg0Nzc3NmU1NzYxNGU0YzZkNGQzNjY1NTI0ZTQ4MzY=',
// //         sender: encodeURIComponent('TXTLCL'),
// //         message: "thank you"
// //       }).then((result) => {
// //           console.log(result);
// //       }).catch((err) => {
// //           console.log(err);
// //       });
// //     //   tlClient.post("/send", params);
// //     }
// //   },
// //   sendVerificationMessage: user => {
// //     if (phone) {
// //       const params = new URLSearchParams();
// //       params.append("numbers", [parseInt("91" + phone)]);
// //       params.append(
// //         "message",
// //         `Your iWheels verification code is ${user.verifyCode}`
// //       );
// //       tlClient.post("/send", params);
// //     }
// //   }
// // };

// // module.exports = smsClient;
// // const axios = require("axios");




// // .then((result)=>{};
// //         console.log(`SMS API: ${URL} RESULT =`,result);
// //         return result; 
// //     }).catch(function (err) {
// //         console.log(`SMS API: ${URL} ERROR =`,err.message);
// //         return err;
// //     });
// //     return response;

// module.exports.sendSMS = async(toNumbers) => {
  
//     let url = 'https://api.textlocal.in/send/';
//     let sender = encodeURIComponent('TXTLCL');
//     let encoded_message = encodeURIComponent("thank you");
//     let body={
//         apikey:'Nzg0Nzc3NmU1NzYxNGU0YzZkNGQzNjY1NTI0ZTQ4MzY=',
//         numbers:toNumbers.join(','),
//         sender: sender,
//         message: encoded_message
//     };
//     // console.log(body);
//     // let result = await callApi('POST',url,body);
//         // return result;

//     // var options = {
//     //     method: 'POST',
//     //     url: url,
//     //     headers:{
//     //         'Content-Type': 'application/json',
//     //         'Cache-Control': 'no-cache'
//     //     },
//     //     data:body,
//     //     json:true
//     // };
            
//     let response = await axios({
//         method: 'POST',
//         url: url,
//         headers:{
//             'Content-Type': 'application/json',
//             'Cache-Control': 'no-cache'
//         },
//         data:body,
//         json:true
//     })
//     console.log(response);
//     // .then((result) => {
//     //     console.log(result);
//     // }).catch((err) => {
//     //     console.log(err);
//     // });
// }

var https = require('https');

var urlencode = require('urlencode');


var sendMessage = function(user,req,res, next){

    // var username = 'chandan';

    var hash = urlencode('Nzg0Nzc3NmU1NzYxNGU0YzZkNGQzNjY1NTI0ZTQ4MzY='); 

    var sender = urlencode('TXTLCL');

    var msg=encodeURIComponent(user.msg);

    var data = {'apikey': 'Nzg0Nzc3NmU1NzYxNGU0YzZkNGQzNjY1NTI0ZTQ4MzY=', 'numbers': ['917865943802'],
    'message' : "thank you", 'sender': "TXTLCL"};
    // '/send?&apikey=' + hash + '&sender=' + sender + '&numbers=' + user.toNumber + '&message=' +msg ;

    var options = {
        method: 'POST',
        host: 'api.textlocal.in',
        path: '/send/', 
        body: data,
        JSON:true

    };

    callback = function (response) {

      var str = '';

      response.on('data', function (chunk) {

        str += chunk;
        console.log(str);
      });

      response.on('end', function () {

        // console.log(str);

        return (JSON.stringify({ success: 'success' }));

      });

    }

    console.log(options);

    https.request(options, callback).end();

};




module.exports.sendMessage = sendMessage;