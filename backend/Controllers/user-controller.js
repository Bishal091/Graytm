const asyncHandler = require("express-async-handler");

const User = require("../models/user-model");
const Account = require("../models/account-model")
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

exports.home = async (req, res, next) => {
  res.send(
    "This is shown using Router at the address '/graytm/user' Using the CONTROLLERS "
  );
};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'singhhello135@gmail.com',
    pass: 'nykn gysr vaix pclg',
  },
});

exports.register = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    // Validate input
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists) {
      return res.status(400).json({ message: "Email or UserName Already Exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate a verification token
    const verificationToken = uuidv4();

    // Create the user with unverified email
    const userCreated = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    // Create the account
    const userId = userCreated._id;
    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    // Send verification email
    const mailOptions = {
      from: 'singhhello135@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Click the following link to verify your email: https://graytm-wallet.netlify.app/graytm/user/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send verification email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(201).json({
          message: "User registered successfully, please check your email for verification",
          user: {
            id: userCreated._id,
            username: userCreated.username,
            email: userCreated.email,
          },
        });
      }
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Verify Email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    // Find the user by verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Mark the email as verified
    user.isVerified = true;
    user.verificationToken = undefined; // Optionally remove the token after verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in email verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};












// // REGISTRATION FORM
// exports.register = async (req, res, next) => {
//   //  const [username,email,phone,password]= await req.body;

//   //  const userExists= User.findOne(email);
//   // if(userExists){
//   //   await User.create(username,email,phone,password);
//   // }

//   // //console.log(req.body)
//   // res.json({message: req.body});

//   try {
//     const { username, firstName, lastName, email, password } = req.body;

//     const userExists = await User.findOne({
//       $or: [{ email: email }, { username: username }],
//     });

//     if (userExists) {
//       return res
//         .status(400)
//         .json({ message: "Email or UserName Already Exists" });
//     }
//     // const saltRound = await bcrypt.genSalt(10);//will define the strongness of the password the more the number the stronger
//     // const hash_password= await bcrypt.hash(password,saltRound);

//     const userCreated = await User.create({
//       username,
//       firstName,
//       lastName,
//       email,
//       password,
//     }); //password:hash_password    --> for using bcrypt here
//     const userId = userCreated._id;

// await Account.create({
//   userId,
//   balance:1+Math.random()*10000

// })

//     res.status(200).json({
//       message: userCreated,
//       token: await userCreated.generateToken(),
//       userId: userCreated._id.toString(),
//     });
//     // In most cases, converting _id to a string is a good practise because it ensures consistencey and compatibility across different JWT libraries and systems. It also aligns with the expectation  that claims in a JWT are represented as strings
//   } catch (e) {
//     //console.log("Error in RE gister side");
//   }
// };

// LOGIN LOGIC
exports.login = async (req, res, next) => {
  // res.send(
  //   "This  LOGIN PAGE is shown using Router at the address '/auth/login' Using the CONTROLLERS "//only can be implemented if get request is used for login page
  // );

  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    //console.log(userExist);

    if (!userExist) {
      return res
        .status(400)
        .json("E-mail not registered. please register email");
    }
    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "LOGIN SUCCESSFULL",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json("Invalid Email or Password");
      // const status=401;
      // const extraDetails="Password is incorrect";
      // const message="Invalid Email or Password";
      // const err={status,extraDetails,message};
      // next(err);
    }
  } catch (e) {
    res.status(500).json("ERROR");
    //console.log(e);
    // const status=500;
    // const extraDetails="Login Page Error";
    // const message="Backend Error";
    //   const err={status,extraDetails,message};
    //   next(err);
  }
};







// USER dATA Logic here-

exports.bulkuser = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: { $regex: filter },
        },
        {
          lastName: { $regex: filter },
        },
      ],
      _id: { $ne: req.userId },
    });
    return res.status(200).json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    //console.log("Error from user Route", error);
  }
};



// USER dATA Logic here-

exports.user = async (req, res, ) => {

  try {
  //  res.status(200).json({msg:"Hello bishal "} )//for checking if the route is working properly or not using postman
  const userData=req.user;
  //console.log(userData);
  return res.status(200).json({userData})
  
 } catch (error) {
  //console.log("Error from user Route",error);
 }
}

// User Update Logic

exports.update = async (req, res) => {
  try {
    await User.updateOne(req.body, {
      id: req.userId,
    });
    res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    //console.log("Error from user Route", error);
  }
};
