const express = require("express");
const router = express.Router();
const cust = require("./controllers/customer");
router.get("/getCustomerList", cust.customerList);
router.get("/getCustomerList/:id", cust.customerList);
module.exports = router;
