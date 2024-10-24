
import mongoose from "mongoose";
import { model,Schema } from "mongoose";
import { type } from "os";

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:'https://res.cloudinary.com/doxykd1yk/image/upload/v1729190573/cugsnsphbzz5bhs6ojap.png',
    },
    phoneNo:{
        type:String,
        type:Number,
        length:10
    },
})

const User=model('User',UserSchema) || mongoose.models(User);

export default User;


