// "Routes" is responsible to forward the supported requests (and any information encoded 
// in request URLs) to the appropriate controller functions.

const express = require('express');
const router =express.Router();
// const validate = require('../middlewares/validate-middleware');
// const signupSchema= require("../validators/validatorRegister-schema");
// const loginSchema = require("../validators/validatorLogin-schema");

// const authMiddleware = require("../middlewares/authMiddleware")
// const authcontroller = require('../Controllers/auth-controller');

// This method only allows to use one HTTP request at a time
router.get('/', (req, res) => {
    res.send('Hello this is from the main route')
  })
  router.get('/type2', (req, res) => {
      res.send('Hello this is from the main route type 2')
    })


// for using Multiple HTTP requests we can use this method
// Before Using Controllers


// router.route("/").get( (req, res) => {
//         res.send('This is shown using Router at the address"/"')
//       })
// router.route("/api/register").get( (req, res) => {
//         res.send('This is Registartion page shown using the address"/register"')
//       })

       

//After Using Controllers

// router.route("/").get(authcontroller.home);

// router.route("/register").post(validate(signupSchema), authcontroller.register); //here we have set the post method to insert data to the server , here using postman ,header>content-type:application/json>body>raw>json>input any data and through post request we can easily access that data using req.body

// router.route("/login").post(validate(loginSchema),authcontroller.login);

// router.route("/user").get(authMiddleware,authcontroller.user);//AuthMiddleware is used so as to know if the user is logged in or not

      module.exports = router;