import express from "express";
import { createForm, getAllForms, getForm, UploadImg } from "../actions/form.actions.js";

const router=express.Router();

router.post("/create",createForm);
router.get("/get/:id",getForm);
router.get("/allForms",getAllForms);
router.post("/upload",UploadImg);


export default router;

