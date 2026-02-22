const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
    mongoose.connect(process.env.BASE_URL)
    .then(()=>console.log("db connection succesful"))

    .catch((error)=>{
        console.log("error in connection");
        console.log(error);
        process.exit(1);
    }
)
}