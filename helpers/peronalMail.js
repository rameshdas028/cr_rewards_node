module.exports.sendEmailToCustomer = async(data)=>{

    var eBody = '';

    eBody += `<head>
    <style>
        body {
            color: #753803;
            font-size: 18px;
            background-color: #ffffff;
            font-family: Ariel, serif;
        }

        .terms-table a {
            color: #bd9a7c;
        }

        td {
            font-family: Ariel, serif;
            font-size: 18px;
        }

        .main-container {
            width: 600px;
            background-color: #efedf3;
        }

        .margin-pad-zero {
            margin-top: 0px;
            margin-bottom: 0px;
            margin-right: 0px;
            margin-left: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-right: 0px;
            padding-left: 0px;
        }

        .spacer {
            font-size: 0;
            line-height: 0;
        }

        .bg-lightbrown {
            background-color: #bd9a7c;
        }

        .bg-lightgreybrown {
            background-color: #c2bab2;
        }

        .voucher-table {
            background-color: #678e4b;
        }

        .terms-table {
            color: #bd9a7c;
            font-size: 12px;
        }

        .terms-table ul {
            margin-top: 10px;
        }

        .terms-table ul li {
            margin-left: 0px;
            padding-bottom: 5px;
            font-size: 12px;
            color: #bd9a7c;
        }

        .terms-table div {
            font-size: 13px;
            color: #bd9a7c;
            font-weight: bold;
        }
    </style>
        </head>`;
    eBody += '<body style="color:#ffdfc4;font-size:18px;background-color:#ffffff;font-family:Ariel,serif;" >';
    eBody += '<center>';
    eBody += '<table class="main-container" cellpadding="0" cellspacing="0" style="width:600px;background-color:#353535;" >';
    //part 1....
    eBody += `<tr>
            <td class="spacer bg-lightbrown" height="15" style="font-family:Ariel,serif;font-size:0;line-height:0;background-color:#353535;">&nbsp;</td>
            </tr>
        <tr>
        <td style="font-family:Ariel,serif;font-size:18px;">
        <img alt="Just for you" src="https://storage.googleapis.com/credence-rewards.appspot.com/emailer-images/justforyouheaderimage.jpg"
            width="600">
        </td>
    </tr>

    <tr>
        <td style="font-family:Ariel,serif;font-size:18px;">
            <table cellpadding="0" cellspacing="0" width="600" style="color:white;font-size:18px;">
            <tr>
                <td colspan="3" lass="spacer" height="25" style="font-family:Ariel,serif;font-size:18px;">
                    &nbsp;</td>
            </tr>
            <tr>
                <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                    &nbsp;</td>
                <td style="font-family:Ariel,serif;font-size:18px;">
                    <p style="line-height:35px;">
                        Dear ${data['name']},<br>
                        Congratulation! You are now a proud owner of a Lifestyle Voucher.
                    </p>
                </td>
                <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                    &nbsp;</td>
            </tr>
            <tr>
                <td colspan="3" class="spacer" height="25"
                    style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
        </table>
    </td>
            </tr>`;

    //part 2.... dynamics tables

    // part 3...
    eBody += `<tr>
    <td style="font-family:Ariel,serif;font-size:18px;">
        <table cellpadding="0" cellspacing="0" class="voucher-table" width="600"
            style="width:100%;max-width:600px;min-width:600px">
            <tr>
                <td colspan="3" class="spacer" height="15"
                    style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
            </tr>


            <tr>

                <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                    &nbsp;</td>

                <td style="font-family:Ariel,serif;font-size:18px;">

                    <table style="color:#ffffff;font-size:18px;line-height:35px;">
                        <tr>
                            <td colspan="2" style="font-size:21px;font-family:Ariel,serif;"><b>Voucher
                                    Details:</b></td>
                        </tr>
                    </table>

                    
                    <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px">

                        <tbody>

                            <tr>

                                <td style="text-align:center"><span
                                        style="font-family:Verdana,Geneva,sans-serif;"><span
                                            style="font-size:16px;"><strong>Voucher
                                                Value</strong></span></span></td>
                                <td style="text-align:center"><span
                                        style="font-family:Verdana,Geneva,sans-serif;"><span
                                            style="font-size:16px;"><strong>Voucher
                                                Code</strong></span></span></td>
                                <td style="text-align:center"><span
                                        style="font-family:Verdana,Geneva,sans-serif;"><span
                                            style="font-size:16px;"><strong>Voucher
                                                Pin</strong></span></span></td>
                                <td style="text-align:center"><span
                                        style="font-family:Verdana,Geneva,sans-serif;"><span
                                            style="font-size:16px;"><strong>Expiry
                                                Date</strong></span></span></td>
                            
                            
                                                </tr>`

    data.details.map(async element => {
        eBody += `<tr>
                            <td style="text-align:center"><span
                                    style="font-family:Verdana,Geneva,sans-serif;"><span
                                        style="font-size:16px;">Rs. ${element["amount"]}</span></span></td>
                            <td style="text-align:center"><span
                                    style="font-family:Verdana,Geneva,sans-serif;"><span
                                        style="font-size:16px;">${element["code"]}</span></span></td>
                            <td style="text-align:center"><span
                                    style="font-family:Verdana,Geneva,sans-serif;"><span
                                        style="font-size:16px;">${element["pin"]}</span></span></td>
                            <td style="text-align:center"><span
                                    style="font-family:Verdana,Geneva,sans-serif;"><span
                                        style="font-size:16px;">${element["expire"]}</span></span></td>
                        </tr>`
    })




    eBody += ` </tbody>
                        </table>

                    </td>
                    <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                        &nbsp;</td>
                </tr>
                <tr>
                    <td colspan="3" class="spacer" height="20"
                        style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="3" class="spacer bg-lightgreybrown" height="10"
                        style="font-family:Ariel,serif;font-size:0;line-height:0;background-color:#494949;">
                        &nbsp;</td>
                </tr>
            </table>
            </td>
        </tr>`;

        // footer part
        eBody+=`<tr>
        <td class="bg-cream" style="font-family:Ariel,serif;font-size:18px;">
            <table cellpadding="0" cellspacing="0" class="terms-table" width="600"
                style="color:#bd9a7c;font-size:12px;">
                <tr>
                    <td colspan="3" class="spacer" height="25"
                        style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                    <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                        &nbsp;</td>
                    <td style="font-family:Ariel,serif;font-size:18px;">
                    <p style="text-align: center;"><br /><span style="font-size: 10px;"><span style="font-family: Verdana,Geneva,sans-serif;"><strong>Terms &amp; Conditions</strong><br /><a href="https://credencerewards.com/redeem/lifestyle/tnc.php">Click here</a> to view the TnC.<br />E-Gift Cards are normally delivered instantly. </span></span><span style="font-size: 10px;"><span style="font-family: Verdana,Geneva,sans-serif;">But sometimes due to system issues, the delivery can be delayed up to 18 hours.</span></span></p>
                    <p style="text-align: center;"><strong><span style="font-size: 10px;"><span style="font-family: Verdana,Geneva,sans-serif;">Powered by</span></span></strong></p>
                    <p style="text-align: center;"><span style="font-family: Verdana,Geneva,sans-serif;">&nbsp;<img style="height: 43px; margin: 1px; width: 70px;" src="https://www.linkpicture.com/q/CR-Logo.png" alt="" /></span></p>
                    </td>
                    <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                        &nbsp;</td>
                </tr>
                <tr>
                    <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                        &nbsp;</td>
                   
                    <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                        &nbsp;</td>
                </tr>
                <tr>
                    <td colspan="3" class="spacer" height="5"
                        style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>`

    //end...
    eBody += `</center>
    </body>`;
    return eBody;


}

// module.exports.sendEmailToCustomer = async(data) =>{
//     // data.details.map((e) => {
//     //     console.log(e);
//     // })
//     var eBody = '';

//     eBody += `<head>
//     <style>
//         body {
//             color: #753803;
//             font-size: 18px;
//             background-color: #ffffff;
//             font-family: Ariel, serif;
//         }

//         .terms-table a {
//             color: #bd9a7c;
//         }

//         td {
//             font-family: Ariel, serif;
//             font-size: 18px;
//         }

//         .main-container {
//             width: 600px;
//             background-color: #efedf3;
//         }

//         .margin-pad-zero {
//             margin-top: 0px;
//             margin-bottom: 0px;
//             margin-right: 0px;
//             margin-left: 0px;
//             padding-top: 0px;
//             padding-bottom: 0px;
//             padding-right: 0px;
//             padding-left: 0px;
//         }

//         .spacer {
//             font-size: 0;
//             line-height: 0;
//         }

//         .bg-lightbrown {
//             background-color: #bd9a7c;
//         }

//         .bg-lightgreybrown {
//             background-color: #c2bab2;
//         }

//         .voucher-table {
//             background-color: #678e4b;
//         }

//         .terms-table {
//             color: #bd9a7c;
//             font-size: 12px;
//         }

//         .terms-table ul {
//             margin-top: 10px;
//         }

//         .terms-table ul li {
//             margin-left: 0px;
//             padding-bottom: 5px;
//             font-size: 12px;
//             color: #bd9a7c;
//         }

//         .terms-table div {
//             font-size: 13px;
//             color: #bd9a7c;
//             font-weight: bold;
//         }
//     </style>
//         </head>`;
//     eBody += '<body style="color:#ffdfc4;font-size:18px;background-color:#ffffff;font-family:Ariel,serif;" >';
//     eBody += '<center>';
//     eBody += '<table class="main-container" cellpadding="0" cellspacing="0" style="width:600px;background-color:#353535;" >';
//     //part 1....
//     eBody += `<tr>
//             <td class="spacer bg-lightbrown" height="15" style="font-family:Ariel,serif;font-size:0;line-height:0;background-color:#353535;">&nbsp;</td>
//             </tr>
//         <tr>
//         <td style="font-family:Ariel,serif;font-size:18px;">
//         <img alt="Just for you" src="https://storage.googleapis.com/credence-rewards.appspot.com/emailer-images/justforyouheaderimage.jpg"
//             width="600">
//         </td>
//     </tr>

//     <tr>
//         <td style="font-family:Ariel,serif;font-size:18px;">
//             <table cellpadding="0" cellspacing="0" width="600" style="color:white;font-size:18px;">
//             <tr>
//                 <td colspan="3" lass="spacer" height="25" style="font-family:Ariel,serif;font-size:18px;">
//                     &nbsp;</td>
//             </tr>
//             <tr>
//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>
//                 <td style="font-family:Ariel,serif;font-size:18px;">
//                     <p style="line-height:35px;">
//                         Dear ${data['name']},<br>
//                         Congratulation! You are now a proud owner of a Lifestyle Voucher
//                     </p>
//                 </td>
//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>
//             </tr>
//             <tr>
//                 <td colspan="3" class="spacer" height="25"
//                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
//             </tr>
//         </table>
//     </td>
//             </tr>`;

//     //part 2.... dynamics tables

//     // part 3...
//     eBody += `<tr>
//     <td style="font-family:Ariel,serif;font-size:18px;">
//         <table cellpadding="0" cellspacing="0" class="voucher-table" width="600"
//             style="width:100%;max-width:600px;min-width:600px">
//             <tr>
//                 <td colspan="3" class="spacer" height="15"
//                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
//             </tr>


//             <tr>

//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>

//                 <td style="font-family:Ariel,serif;font-size:18px;">

//                     <table style="color:#ffffff;font-size:18px;line-height:35px;">
//                         <tr>
//                             <td colspan="2" style="font-size:21px;font-family:Ariel,serif;"><b>Voucher
//                                     Details:</b></td>
//                         </tr>
//                     </table>

                    
//                     <table align="center" border="1" cellpadding="1" cellspacing="1" style="width:500px">

//                         <tbody>

//                             <tr>

//                                 <td style="text-align:center"><span
//                                         style="font-family:Verdana,Geneva,sans-serif;"><span
//                                             style="font-size:16px;"><strong>Voucher
//                                                 Value</strong></span></span></td>
//                                 <td style="text-align:center"><span
//                                         style="font-family:Verdana,Geneva,sans-serif;"><span
//                                             style="font-size:16px;"><strong>Voucher
//                                                 Code</strong></span></span></td>
//                                 <td style="text-align:center"><span
//                                         style="font-family:Verdana,Geneva,sans-serif;"><span
//                                             style="font-size:16px;"><strong>Voucher
//                                                 Pin</strong></span></span></td>
//                                 <td style="text-align:center"><span
//                                         style="font-family:Verdana,Geneva,sans-serif;"><span
//                                             style="font-size:16px;"><strong>Expiry
//                                                 Date</strong></span></span></td>
                            
                            
//                                                 </tr>`

//     data.details.map(async element => {
//         eBody += `<tr>
//                             <td style="text-align:center"><span
//                                     style="font-family:Verdana,Geneva,sans-serif;"><span
//                                         style="font-size:16px;">Rs. ${element["amount"]}</span></span></td>
//                             <td style="text-align:center"><span
//                                     style="font-family:Verdana,Geneva,sans-serif;"><span
//                                         style="font-size:16px;">${element["code"]}</span></span></td>
//                             <td style="text-align:center"><span
//                                     style="font-family:Verdana,Geneva,sans-serif;"><span
//                                         style="font-size:16px;">${element["pin"]}</span></span></td>
//                             <td style="text-align:center"><span
//                                     style="font-family:Verdana,Geneva,sans-serif;"><span
//                                         style="font-size:16px;">${element["expire"]}</span></span></td>
//                         </tr>`
//     })



//     eBody+=`<tr>
//     <td class="bg-cream" style="font-family:Ariel,serif;font-size:18px;">
//         <table cellpadding="0" cellspacing="0" class="terms-table" width="600"
//             style="color:#bd9a7c;font-size:12px;">
//             <tr>
//                 <td colspan="3" class="spacer" height="25"
//                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
//             </tr>
//             <tr>
//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>
//                 <td style="font-family:Ariel,serif;font-size:18px;">
//                     <p style="text-align:center"><br />
//                         <span style="font-size:10px;"><span style="font-family:Verdana,Geneva,sans-serif;"><strong>Terms &amp; Conditions</strong><br />
//                         <a href="https://credencerewards.com/redeem/lifestyle/tnc.php">Click here</a> to view the TnC.<br />
//                         E-Gift Cards are normally delivered instantly. </span></span><span style="font-size:10px;"><span style="font-family:Verdana,Geneva,sans-serif;">But sometimes due to system issues, the delivery can be delayed up to 18 hours.</span></span></p>
                        
//                         <p style="text-align:center"><strong><span style="font-size:10px;"><span style="font-family:Verdana,Geneva,sans-serif;">Powered by</span></span></strong></p>
                        
//                         <p style="text-align:center"><span style="font-family:Verdana,Geneva,sans-serif;">&nbsp;<img alt="" src="https://ckeditor.com/apps/ckfinder/userfiles/files/CR%20Logo.png" style="height:43px; margin:1px; width:70px" /></span></p>
//                 </td>
//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>
//             </tr>
//             <tr>
//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>
               
//                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
//                     &nbsp;</td>
//             </tr>
//             <tr>
//                 <td colspan="3" class="spacer" height="5"
//                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
//             </tr>
//         </table>
//         </td>
//     </tr>`
//     //end...
//     eBody += `</center>
//     </body>`;
//     return eBody;


// }



// async function sendEmailFunc() {

//     let domain = "mg.credencerewards.com"
//     let api_key = "392c00c3621245df93423d1cfc4d8c4d-8b7bf2f1-e1b59d2a"
//     var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

//     let data = [
//         {
//             name: "Tarique",
//             Deatils: [{
//                 "amount": 2000,
//                 "code": "1213710028122450",
//                 "pin": "5272",
//                 "expire": "12-03-2023"
//             },
//             {
//                 "amount": 2000,
//                 "code": "1213710027122451",
//                 "pin": "5273",
//                 "expire": "12-03-2023"
//             },
//             {
//                 "amount": 1000,
//                 "code": "1213710022122447",
//                 "pin": "5269",
//                 "expire": "12-03-2023"
//             }]
//         }
//     ]
//     await Promise.all(data.map(async (Element) => {
//         let template = await sendEmailToCustomer(Element);
//         var newData = {
//             from: 'noreply@credencerewards.com',
//             to: 'Csahoo776@gmail.com',
//             subject: 'testing from Developer',
//             html: template
//         };

//         mailgun.messages().send(newData, function (error, body) {
//             if (error) {
//                 console.log('Mail gun error', error);
//                 // return true;
//             } else {
//                 console.log('Mail gun send mesg success', body);
//                 // return true;
//             }
//         });
//         console.log(template)
//     }))




// }

// sendEmailFunc()


/* 
    // eBody += ` </tbody>
    //                     </table>

    //                 </td>
    //                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
    //                     &nbsp;</td>
    //             </tr>
    //             <tr>
    //                 <td colspan="3" class="spacer" height="5"
    //                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
    //             </tr>
    //             <tr>
    //                 <td colspan="3" class="spacer bg-lightgreybrown" height="15"
    //                     style="font-family:Ariel,serif;font-size:0;line-height:0;background-color:#494949;">
    //                     &nbsp;</td>
    //             </tr>
    //         </table>
    //         </td>
    //     </tr>`;

        // footer part
    //     eBody+=` <tr>
    //     <td class="bg-cream" style="font-family:Ariel,serif;font-size:18px;">
    //         <table cellpadding="0" cellspacing="0" class="terms-table" width="600"
    //             style="color:#bd9a7c;font-size:12px;">
    //             <tr>
    //                 <td colspan="3" class="spacer" height="25"
    //                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
    //             </tr>
    //             <tr>
    //                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
    //                     &nbsp;</td>
    //                 <td style="font-family:Ariel,serif;font-size:18px;">
    //                     <div class="margin-pad-zero"
    //                         style="margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;font-size:13px;color:#bd9a7c;font-weight:bold;">
    //                         <b>How to redeem the voucher?</b>
    //                     </div>
    //                     <ul
    //                         style="padding-left:0;list-style-type:none;list-style-position:outside;list-style-image:none;margin-top:10px;">
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             <b>Step 1:</b> <br>Get the Swiggy mobile app as the voucher can be redeemed only
    //                             on the mobile app - <a
    //                                 href="https://play.google.com/store/apps/details?id=in.swiggy.android"
    //                                 target="_blank" style="text-decoration: underline">Download from Google
    //                                 Play</a> / <a
    //                                 href="https://itunes.apple.com/in/app/swiggy-food-order-delivery/id989540920"
    //                                 target="_blank" style="text-decoration: underline">Download from Apple
    //                                 Store</a>
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             <b>Step 2:</b> <br>If not registered you will be asked to sign up with Swiggy
    //                             using an OTP based process.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             <b>Step 3:</b> <br>On the Swiggy Money page, read through the onboarding details
    //                             and click on <b>Activate Swiggy Money</b>. You will be asked to enter your
    //                             government ID details (for KYC) and enter the OTP received on your registered
    //                             number and Confirm Details.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             <b>Step 4:</b> <br>You will then land on the homepage. Click on the <b>Add
    //                                 Voucher</b> button, on the top right of the page.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             <b>Step 5:</b> <br>Enter your 16 digit alphanumeric code and the 6 digit PIN,
    //                             then press <b>Redeem Voucher</b>. Swiggy validates the code and adds the
    //                             denomination to your wallet.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             For more information, you can watch a quick demo here <a target="_blank"
    //                                 style="text-decoration: underline"
    //                                 href="https://www.youtube.com/watch?v=mlRn739e6us">https://www.youtube.com/watch?v=mlRn739e6us</a>
    //                         </li>
    //                     </ul>
    //                 </td>
    //                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
    //                     &nbsp;</td>
    //             </tr>
    //             <tr>
    //                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
    //                     &nbsp;</td>
    //                 <td style="font-family:Ariel,serif;font-size:18px;">
    //                     <div class="margin-pad-zero"
    //                         style="margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;font-size:13px;color:#bd9a7c;font-weight:bold;">
    //                         <b>Terms &amp; Conditions</b>
    //                     </div>
    //                     <ul
    //                         style="padding-left:0;list-style-type:none;list-style-position:inside;list-style-image:none;margin-top:10px;">
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             This Voucher code is issued by ICICI to add money to Swiggy wallet powered by
    //                             ICICI
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             Use of money in Swiggy Wallet powered by ICICI will be subject to <a
    //                                 href="https://www.icicibank.com/terms-condition/tnc-for-swiggy-money.page"
    //                                 target="_blank" style="text-decoration: underline">terms and conditions</a>
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             The voucher is non transferable and you must add the money to your wallet as
    //                             soon as possible.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             Once the amount is loaded to Swiggy Wallet powered by ICICI, the amount cannot
    //                             be expired.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             The amount in Swiggy Wallet powered by ICICI can only be used on food orders on
    //                             the Platform.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             The amount cannot be taken out/transferred from Swiggy Wallet powered by ICICI.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             The amount can be used on multiple transactions.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             The amount covers taxes, packing charges, delivery fee.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             For users having the Swiggy Wallet powered by ICICI account already activated
    //                             the amount will be uploaded in the wallet once these Voucher Codes are redeemed
    //                             by the end user in the Swiggy app.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             Users not having the Swiggy Wallet powered by ICICI account need to login to the
    //                             Swiggy app and create the Swiggy account to use these Voucher Codes.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             Users will need to perform a one time verification before utilizing the Swiggy
    //                             Wallet powered by ICICI by filling the KYC (Know your customer details), if not
    //                             already done.
    //                         </li>
    //                         <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
    //                             For any queries contact helpdesk at <a target="_blank"
    //                                 style="text-decoration: underline"
    //                                 href="mailto:support.officeperks@swiggy.in">support.officeperks@swiggy.in</a>
    //                         </li>
    //                     </ul>

    //                 </td>
    //                 <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
    //                     &nbsp;</td>
    //             </tr>
    //             <tr>
    //                 <td colspan="3" class="spacer" height="5"
    //                     style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
    //             </tr>
    //         </table>
    //     </td>
    // </tr>`
*/