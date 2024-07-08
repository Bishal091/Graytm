const {Schema,model} = require("mongoose");


const contactSchema = new Schema({
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
      message: {
      type: String,
      require: true,
      
    },
   
  });


  const Contact = new model("Contact", contactSchema); //will create a collection named as contacts('s' will be automatically inserted at last ) and will follow the schema defined above with the fields.

  module.exports = Contact;
