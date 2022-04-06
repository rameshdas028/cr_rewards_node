const express = require('express');
const router = express.Router();
const {
    userRegistratioValidator,
    signUp,
    login
} = require('../controllers/userController');

router.post("/signup",userRegistratioValidator,signUp);
router.post("/login",userRegistratioValidator,login);
module.exports = router;
