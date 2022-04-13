const express = require('express');
const router = express.Router();
const {
    createLifeStyleUser,
    getSuccessRes,
    lifeStyleOrder,
    paymentVerify,
    sendText,
    sendEmail,
    sendEmailWithMailGun
} = require('../controllers/lifeStyle/lifeStyleController');

router.post("/order/init", createLifeStyleUser);
router.get("/getSuccessRes", getSuccessRes);
router.post("/order/additems", lifeStyleOrder);
router.get("/order/verify/:id", paymentVerify);
router.post("/send",sendText);
router.post("/sendemail",sendEmail);
router.post("/sendemail_gun",sendEmailWithMailGun);


module.exports = router;