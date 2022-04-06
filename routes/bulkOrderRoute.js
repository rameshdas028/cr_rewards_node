const express = require('express');
const router = express.Router();
const {
    bulkOrderValidator,
    createBulkOrder,
    listOfOrders,
    viewOrder
} = require('../controllers/bulkOrder/bulkOrderController');

router.post("/addOrder",bulkOrderValidator,createBulkOrder);
router.get("/allOrders",listOfOrders);
router.get("/viewOrder/:id",viewOrder);
// router.get('/getCompany/:id',getSpecificCompany);
// router.get('/companyList',companiesForDropDown);
module.exports = router;