const mongoose=require('mongoose');
const MenuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type:Date,
       default: Date.now
    },
    orderby:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    
},{timestamps:true});

module.exports = mongoose.model("Menu", MenuSchema);