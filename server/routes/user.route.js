
import express from "express";
import { checkMail, getUser, Login, resetPassword, sendMail, SignUp } from "../actions/user.actions.js";

const router=express.Router();

router.post('/login',Login);
router.post("/signup",SignUp);
router.get("/user/:id",getUser);
router.get("/checkMail",checkMail);
router.post("/sendMail",sendMail);
router.post("/reset",resetPassword);

export default router;

