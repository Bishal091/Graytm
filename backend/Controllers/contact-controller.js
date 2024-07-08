const Contact = require("../models/contact-model");
const User = require("../models/user-model");

exports.contact = async (req, res, next) => {
  try {
    const { username, email, message } = req.body;

    // Check if the user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(400)
        .json({ msg: "Email address not found. Please enter a valid email." });
    }

    // Create a new contact message
    const userCreated = await Contact.create({ username, email, message });

    if (userCreated) {
      return res
        .status(200)
        .json({
          msg: "Message sent successfully.",
          userId: userCreated._id.toString(),
        });
    }

  } catch (error) {
    // Handle different types of errors
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ msg: `Validation error: ${error.message}` });
    } else if (error.code && error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ msg: "Duplicate key error: The email or username may already exist." });
    } else {
      // General server error
      return res
        .status(500)
        .json({ msg: "Server error. Please try again later." });
    }
  }
};
