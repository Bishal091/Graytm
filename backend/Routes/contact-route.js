const express = require('express');
const router =express.Router();
const validate = require('../middlewares/validate-middleware');
const contactController= require("../Controllers/contact-controller");
const contactSchema = require('../validators/validatorContact-schema');




router.route("/").post(validate(contactSchema),contactController.contact);


module.exports = router;