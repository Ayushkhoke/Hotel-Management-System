const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.BASE_URL,{
        maxPoolSize: 10,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(()=>console.log("db connection succesful"))

    .catch((error)=>{
        console.log("error in connection");
        console.log(error);
        process.exit(1);
    }
)
}