const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/first_mernadmin"//from mongosh and last part we have named

const URI = "mongodb+srv://bishalsinghbangari:l0BVNf5waUgp2Q34@graytm.gn1zl6k.mongodb.net/?retryWrites=true&w=majority&appName=graytm "
// const URI = `${process.env.MONGODB_URI}`;
// Database of name first_mernadmin will be created but will only be seen when collections are added to it

// 1st method 
// mongoose.connect(URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection was Successfull bhenchod");
        
    } catch (e) {
        console.log("Connection Unsuccessful");
        console.log(e);
        process.exit(0);
        
    }

}
module.exports=connectDb;