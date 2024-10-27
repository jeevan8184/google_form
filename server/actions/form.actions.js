import mongoose from "mongoose";
import Form from "../models/form.model.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name:'doxykd1yk',
    api_key:'626662762526426',
    api_secret:'GXJGOUMRsHH4_JDFRRQWuHeB3hE'
})

export const getForm= async (req, res) => {
    const {id}=req.params;
    try {
        const form = await Form.findById(id);
        return res.status(200).json(form);
    } catch (error) {
        console.log(error);
    }
}

export const getAllForms = async (req, res)=>{

    try {
        const forms = await Form.find({});
        return res.status(200).json(forms);
    } catch (error) {
        console.log(error);
    }
}

export const UploadImg=async(req,res)=> {
    const {data}=req.body;
    try {
        if(!data) return res.status(200).json({error:"No image provided"});
        const result=await cloudinary.uploader.upload(data,{folder:"assign"});
        res.status(200).json(result.secure_url);
    } catch (error) {
        console.log(error);
    }
}

export const createForm = async (req, res) => {
    const { name,userId,bgImg,bgColor,sections } = req.body;
  try {
    const existForm=await Form.findOne({name,userId});
    if(existForm) return res.status(200).json({error:"Already this form exists"});
    const form = new Form({name,userId,bgImg,bgColor,sections});
    form.save();
    return res.status(201).json(form);
  } catch (error) {
    console.log(error);
  }
};

export const addSection=async(req,res)=>{
    const {formId,sections,bgImg,bgColor,sizes,allFonts}=req.body;

    try {
        const form=await Form.findByIdAndUpdate(formId,{
            bgImg,
            bgColor,
            sizes,
            allFonts,
            sections
        },{new:true});
        
        return res.status(200).json(form);
    } catch (error) {
        console.log(error);
    }
}

