
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const SignUp=async(req,res)=>{
    const {username,email,password} = req.body;
    console.log("signup", username, email, password);

    try {
        const existUser=await User.findOne({email});
        if(existUser) {
            return res.status(200).json({error: "User already exists"});
        }
        const newPass=await bcrypt.hash(password,12);
        
        const newUser=new User({username,email,password:newPass});
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn:"1d"});
        
        res.status(201).json({message: "User registered successfully",user: newUser,token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
}

export const Login=async(req,res)=>{
    const {email,password} = req.body;
    console.log("login", email, password);

    try {
        const existUser=await User.findOne({email});
        if(!existUser) {
            return res.status(200).json({error: "User does not exists"});
        }
        const checkPass=await bcrypt.compare(password,existUser.password);
        if(!checkPass) return res.status(200).json({error:'password incorrect'});
        const token=jwt.sign({id:existUser._id},process.env.SECRET,{expiresIn:"1d"});

        return res.status(200).json({message:"Login successful",user:existUser,token:token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
}

export const getUser =async (req, res) =>{
    console.log("currUser",req.params);
    const {id}=req.params;
    try {
        const user=await User.findById(id);
        if(!user) return res.status(200).json({error:"User not found"});
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error});
    }
}


export const checkMail=async(req,res)=> {
    const {email}=req.query;
    try {
        const existUser=await User.findOne({email});
        if(!existUser) return res.status(200).json({error: 'User not found'});
        res.status(200).json({message:"user exists"});
    } catch (error) {
        console.log(error);
    }
}

export const sendMail=async(req,res)=>{
    const {email,msg}=req.body;

    try {
        const transpoter=nodemailer.createTransport({
            service:"gmail",
            port: 587,
            secure: false, 
            auth:{
                user:process.env.MY_EMAIL,
                pass:process.env.MY_PASS
            }
        });

        await transpoter.sendMail({
            from: process.env.MY_EMAIL,
            to: email,
            subject: "Reset Password otp",
            text:msg
        })
        return res.status(200).json({message:"otp sent successfully"});
    } catch (error) {
        console.log(error);
    }
}

export const resetPassword=async(req,res)=>{
    const {password,email} = req.body;
    try {
        const existUser=await User.findOne({email});
        if(!existUser) {
            return res.status(200).json({error: "User does not exists"});
        }
        const newPass=await bcrypt.hash(password,12);
        
        await User.findByIdAndUpdate(existUser._id,{password:newPass});
        res.status(200).json({message: "Password reset successfully"});
    } catch (error) {
        console.log(error);
    }
}