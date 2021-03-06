module.exports.sendEmailToCustomerTemplate = async(data)=>{
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
                        Hope you enjoy this Swiggy Money (powered by ICICI) Voucher!
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

    //part 2....

    eBody += `<tr>
            <td style="font-family:Ariel,serif;font-size:18px;">
            <table cellpadding="0" cellspacing="0" class="voucher-table" width="600"
                style="background-color:#ff8321;width:100%;max-width:600px;min-width:600px">
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
                            
                            <tr>
                                <td style="font-family:Ariel,serif;font-size:18px;">Voucher Value:</td>
                                <td style="font-family:Ariel,serif;font-size:18px;">Rs. ${data['amount']}</td>
                            </tr>

                            <tr>
                                <td style="width:190px;font-family:Ariel,serif;font-size:18px;">Voucher Code:
                                </td>
                                <td style="font-family:Ariel,serif;font-size:18px;">${data['number']}</td>
                            </tr>

                            
                            <tr>
                                <td style="font-family:Ariel,serif;font-size:18px;">Voucher Pin:</td>
                                <td style="font-family:Ariel,serif;font-size:18px;">${data['pin']}</td>
                            </tr>


                            <tr>
                                <td style="font-family:Ariel,serif;font-size:18px;">Validity of Voucher:</td>
                                <td style="font-family:Ariel,serif;font-size:18px;">${data['expiry']}</td>
                            </tr>
                            
                            <tr>
                                <td style="vertical-align: bottom;">
                                    <img alt="Amazon Pay Logo"
                                        src="http://credencerewards.com/email-images/swiggy-logo.png" width="50"
                                        style="background: white; padding:10px;border-radius:13px">
                                </td>
                                <td style="font-family:Ariel,serif;font-size:18px; padding: 20px 0 10px 0">
                                    &nbsp;</td>
                            </tr>
                        </table>
                    </td>
                    <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                        &nbsp;</td>
                </tr>
                <tr>
                    <td colspan="3" class="spacer" height="5"
                        style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                    <td colspan="3" class="spacer bg-lightgreybrown" height="15"
                        style="font-family:Ariel,serif;font-size:0;line-height:0;background-color:#494949;">
                        &nbsp;</td>
                </tr>
            </table>
        </td>
        </tr>`;

    // part 3...
    eBody += `<tr>
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
                <div class="margin-pad-zero"
                    style="margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;font-size:13px;color:#bd9a7c;font-weight:bold;">
                    <b>How to redeem the voucher?</b></div>
                <ul
                    style="padding-left:0;list-style-type:none;list-style-position:outside;list-style-image:none;margin-top:10px;">
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        <b>Step 1:</b> <br>Get the Swiggy mobile app as the voucher can be redeemed only
                        on the mobile app - <a
                            href="https://play.google.com/store/apps/details?id=in.swiggy.android"
                            target="_blank" style="text-decoration: underline">Download from Google
                            Play</a> / <a
                            href="https://itunes.apple.com/in/app/swiggy-food-order-delivery/id989540920"
                            target="_blank" style="text-decoration: underline">Download from Apple
                            Store</a>
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        <b>Step 2:</b> <br>If not registered you will be asked to sign up with Swiggy
                        using an OTP based process.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        <b>Step 3:</b> <br>On the Swiggy Money page, read through the onboarding details
                        and click on <b>Activate Swiggy Money</b>. You will be asked to enter your
                        government ID details (for KYC) and enter the OTP received on your registered
                        number and Confirm Details.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        <b>Step 4:</b> <br>You will then land on the homepage. Click on the <b>Add
                            Voucher</b> button, on the top right of the page.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        <b>Step 5:</b> <br>Enter your 16 digit alphanumeric code and the 6 digit PIN,
                        then press <b>Redeem Voucher</b>. Swiggy validates the code and adds the
                        denomination to your wallet.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        For more information, you can watch a quick demo here <a target="_blank"
                            style="text-decoration: underline"
                            href="https://www.youtube.com/watch?v=mlRn739e6us">https://www.youtube.com/watch?v=mlRn739e6us</a>
                    </li>
                </ul>
            </td>
            <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                &nbsp;</td>
        </tr>
        <tr>
            <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                &nbsp;</td>
            <td style="font-family:Ariel,serif;font-size:18px;">
                <div class="margin-pad-zero"
                    style="margin-top:0px;margin-bottom:0px;margin-right:0px;margin-left:0px;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;font-size:13px;color:#bd9a7c;font-weight:bold;">
                    <b>Terms &amp; Conditions</b></div>
                <ul
                    style="padding-left:0;list-style-type:none;list-style-position:inside;list-style-image:none;margin-top:10px;">
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        This Voucher code is issued by ICICI to add money to Swiggy wallet powered by
                        ICICI
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        Use of money in Swiggy Wallet powered by ICICI will be subject to <a
                            href="https://www.icicibank.com/terms-condition/tnc-for-swiggy-money.page"
                            target="_blank" style="text-decoration: underline">terms and conditions</a>
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        The voucher is non transferable and you must add the money to your wallet as
                        soon as possible.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        Once the amount is loaded to Swiggy Wallet powered by ICICI, the amount cannot
                        be expired.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        The amount in Swiggy Wallet powered by ICICI can only be used on food orders on
                        the Platform.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        The amount cannot be taken out/transferred from Swiggy Wallet powered by ICICI.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        The amount can be used on multiple transactions.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        The amount covers taxes, packing charges, delivery fee.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        For users having the Swiggy Wallet powered by ICICI account already activated
                        the amount will be uploaded in the wallet once these Voucher Codes are redeemed
                        by the end user in the Swiggy app.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        Users not having the Swiggy Wallet powered by ICICI account need to login to the
                        Swiggy app and create the Swiggy account to use these Voucher Codes.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        Users will need to perform a one time verification before utilizing the Swiggy
                        Wallet powered by ICICI by filling the KYC (Know your customer details), if not
                        already done.
                    </li>
                    <li style="margin-left:0px;padding-bottom:5px;font-size:12px;color:#bd9a7c;">
                        For any queries contact helpdesk at <a target="_blank"
                            style="text-decoration: underline"
                            href="mailto:support.officeperks@swiggy.in">support.officeperks@swiggy.in</a>
                    </li>
                </ul>

            </td>
            <td class="spacer" width="45" style="font-family:Ariel,serif;font-size:0;line-height:0;">
                &nbsp;</td>
        </tr>
        <tr>
            <td colspan="3" class="spacer" height="5"
                style="font-family:Ariel,serif;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
         </table>
        </td>
        </tr>`;

    //end...
    eBody += `</center>
    </body>`;
    return eBody;



}

