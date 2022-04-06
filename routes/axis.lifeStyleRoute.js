const express = require('express');
const router = express.Router();
const {
    addLifeStyleUserValidator,
    createOrder,
    giveMessage
} = require('../controllers/lifeStyle/lifeStyleController');

router.post("/createOrder",addLifeStyleUserValidator,createOrder);
router.get("/giveMessage",giveMessage);
module.exports = router;