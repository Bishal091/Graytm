const { z } = require("zod");

// Creating an Object Schema for Registration

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name Is required" })
    .trim()
    .min(3, { message: "Minimum 3 Characters must be present" })
    .max(26, { message: "Max Characters upto 26" }),

  email:z 
  .string({ required_error: "Emai-Address Is required" })
  .trim()
  .email({message:"Invalid E-mail address"})
  .min(5, { message: "Minimum 5 Characters must be present" })
  .max(50, { message: "Max Characters upto 50" }),

  message:z
  .string({ required_error: "Please add your message!" })
  .min(2, { message: "Message must be minimum of 7 characters" })
  .max(256, { message: "Max Characters of 26 for message." }),
});


module.exports= contactSchema;
