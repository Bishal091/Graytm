
const express = require('express');
const router =express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const accountController = require("../Controllers/account-controller")


router.route("/balance").get(authMiddleware,accountController.balance);
router.route("/transfer").post(authMiddleware,accountController.transfer);

      module.exports = router;