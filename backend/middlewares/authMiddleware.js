const jwt = require("jsonwebtoken")
const User = require("../models/user-model")

const authMiddleware= async(req,res,next)=>{

    // get token from frontend,,,,,,in start using postaman to send the data from header->Authorization->bearer Token
    const token= req.header('Authorization');

    if (!token) {
    // if attempt to use expired token
    return res.status(400).json({msg:"Unauthorized HTTP,token not provided"})
    }

    // Assuming token is in the format of Bearer<Token> to remove "Bearer " prefix
    console.log("token from authMiddleware",token)//will console Bearer edkjcnsjkz...

    const jwtToken= token.replace('Bearer',"").trim();

 console.log("Edited token from authMiddleware",jwtToken)//will console the token without Bearer


//  VERIFY TOKEN
try {
    const isVerified= jwt.verify(jwtToken, `${process.env.JWT_SECRET}`);
//    console.log(isVerified);//will console userid email and isadmin because that is what paylod we have defined on the generation of token OR first step of getting the data from backend so that it can be used by frontend
    
     const userData= await User.findOne({email:isVerified.email}).select({password:0,});//will find all the data from searching the database using email
     console.log(userData);//will console the complete detail of the userincluding objectId phone  everything excluding pswrd

    //  SET CUSTOM PROPERTIES i.e anyone can use these if they are using this middleware
    req.user=userData;
    req.token=token;
    req.userId=userData._id
    // req.id=userData._id;
    // req.is_admin= userData.isAdmin;
    

    next();
} catch (error) {
    return res.status(400).json({msg:"Unauthorized HTTP,token not provided"})
}

   

}
module.exports=authMiddleware;