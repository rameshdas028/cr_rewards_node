const express = require('express');
const router = express.Router();
const {
    addLifeStyleUserValidator,
    createLifeStyleUser,
    getSuccessRes,
    lifeStyleOrderValidator,
    lifeStyleOrder,
    paymentVerify,
    sendText
} = require('../controllers/lifeStyle/lifeStyleController');

router.post("/order/init",addLifeStyleUserValidator,createLifeStyleUser);
router.get("/getSuccessRes",getSuccessRes);
router.post("/order/additems", lifeStyleOrderValidator,lifeStyleOrder);
router.get("/order/verify/:id",paymentVerify);
router.post("/send",sendText)
module.exports = router;