const { z } = require("zod");

// Creating an Object Schema for Registration

const registerSchema = z.object({
  username: z
    .string({ required_error: "Name Is required" })
    .trim()
    .min(3, { message: "Minimum 3 Characters must be present in Username" })
    .max(26, { message: "Max Characters upto 26" }),

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

  email: z
    .string({ required_error: "Emai-Address Is required" })
    .trim()
    .email({ message: "Invalid E-mail address" })
    .min(5, { message: "Minimum 5 Characters must be present" })
    .max(50, { message: "Max Characters upto 50" }),

  // phone:z
  // .number({ required_error: "Phone Number Required" })
  // .min(10, { message: "Invalid phone number" }),
  // // .max(10, { message: " Invalid phone number" }),

  password: z
    .string({ required_error: "Password Is required" })
    .min(7, { message: "Password must be minimum of 7 characters" })
    .max(26, { message: "Max Characters of 26 for password." }),
});

module.exports = registerSchema;
