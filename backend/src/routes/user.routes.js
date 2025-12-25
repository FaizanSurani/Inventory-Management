import express from 'express';
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = "sample_key";
const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const emailVerify = await User.findOne({email});

        if(emailVerify) {
            return res.status(404).json({message: "User Already Registered"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPass = await bcryptjs.hash(password, salt);

        await User.create({
            name: name,
            email: email,
            password: hashPass,
        });

        return res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.post("/login", async(req,res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({email});
        const validPass = await bcryptjs.compare(password, userData.password);

        if(!validPass) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const data = {
            user:{
                id: userData._id
            },
        };

        const authToken = jwt.sign(data, JWT_SECRET_KEY);

        return res.status(200).json({
            id: userData._id,
            authToken: authToken
        });
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

export default router;