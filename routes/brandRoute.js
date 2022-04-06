const express = require('express');
const router = express.Router();
const {
    brandValidator,
    createBrand,
    brandListForDropDown
} = require('../controllers/brandController');

router.post("/addBrand",brandValidator,createBrand);
router.get("/brandList",brandListForDropDown);
// router.get('/getCompany/:id',getSpecificCompany);

module.exports = router;