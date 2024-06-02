const { z } = require("zod");

// Creating an Object Schema for Registration

const loginSchema = z.object({

  email:z 
  .string({ required_error: "Emai-Address Is required" })
  .trim()
  .email({message:"Invalid E-mail address"})
  .min(5, { message: "Minimum 5 Characters must be present" })
  .max(50, { message: "Max Characters upto 50" }),

  password:z
  .string({ required_error: "Name Is required" })
  .min(7, { message: "Password must be minimum of 7 characters" })
  .max(26, { message: "Max Characters of 26 for password." }),
});


module.exports= loginSchema;
