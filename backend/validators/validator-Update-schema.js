const { z } = require("zod");

// Creating an Object Schema for Registration

const updateSchema = z.object({
    password: z
    .string({ required_error: "Password Is required" })
    .min(7, { message: "Password must be minimum of 7 characters" })
    .max(26, { message: "Max Characters of 26 for password." }),
    
    firstName: z
    .string({ required_error: " First Name Is required" })
    .trim()
    .min(3, { message: "Minimum 3 Characters must be present in firstname" })
    .max(10, { message: "Max Characters upto 10" }),

  lastName: z
    .string({ required_error: " last Name Is required" })
    .trim()
    .min(3, { message: "Minimum 3 Characters must be present in last Name" })
    .max(10, { message: "Max Characters upto 10" }),

});


module.exports= updateSchema;
