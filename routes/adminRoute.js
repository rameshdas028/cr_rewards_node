const express = require('express');
const router = express.Router();
const {
    addCompanyValidator,
    createCompany,
    allCompanies,
    getSpecificCompany,
    companiesForDropDown
} = require('../controllers/adminController');

router.post("/addCompany",addCompanyValidator,createCompany);
router.get("/allCompanies",allCompanies);
router.get('/getCompany/:id',getSpecificCompany);
router.get('/companyList',companiesForDropDown);
module.exports = router;