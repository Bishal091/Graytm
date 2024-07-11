const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
//   phone: {
//     type: Number,
//     require: true,
//   },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// // Securing Password Using Bcrypt

// //pre is a type of middle ware that runs before the implification of data in the database(save method), and the funcion to be run is to be defined after
userSchema.pre("save", async function (next) {
  //console.log("pre method", this); //will show the data just before saving to database\(Here before applying the bcrypt method)

  const user = this;

  if (!user.isModified("password")) {
    next(); //move on to next step;
  }
  try {
    const saltRound = await bcrypt.genSalt(10); //will define the strongness of the password the more the number the stronger
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    //console.log("After applying Bcrypt method", this); //will show the data just before saving to database\(Here After applying the bcrypt method)
  } catch (e) {
    next(e);
  }
});
// compare PAsswords

userSchema.methods.comparePassword= async function(password){

return bcrypt.compare(password, this.password);//avoid return bcrypt.compare(this.password, password);

};



// // JWT
// // JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
// // Authorization and Authentication

// // below is an instance method that is called to create function called generateToken and it can be accessed anywhere on any page.(also we can create many more function simultaneously with the help of this)
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            // Payload-
            userId: this._id.toString(),
            email: this.email,
            isAdmin:this.isAdmin,

        },
        // Signature
        `${process.env.JWT_SECRET}`,
        {
          // optional
          expiresIn:"25d",
        }
        );
        
    } catch (e) {
        //console.log(e);
    }

};






// Define MODEL or Collection Name

const User = new mongoose.model("User", userSchema); //will create a collection named as users('s' will be automatically inserted at last ) and will follow the schema defined above with the fields.

module.exports = User;
