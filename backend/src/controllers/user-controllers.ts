import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllusers = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const users = await User.find();
        return res.status(200).json({"messages": "OK", users})
    } catch (error) {
        return res.status(200).json({"messages": "OK", error})
    }
}

export const userSignUp = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(401).send("User already exists");
        const hashedPassword = await hash(password,10);
        const user = new User({name,email,password: hashedPassword});
        await user.save();


        res.clearCookie(COOKIE_NAME, {path:'/',domain:'localhost',httpOnly:true,signed:true})
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        const token = createToken(user._id.toString(),user.email.toString(),'7d')
        res.cookie(COOKIE_NAME,token, {path:'/',domain:'localhost',expires,httpOnly:true,signed:true})
        
        return res.status(200).json({"messages": "OK", id: user._id.toString(), user});
    } catch (error) {
        return res.status(200).json({"messages": "OK", error})
    }
}

export const userLogin = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).send("login failed");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).send("login failed wrong password entered");
        }

        res.clearCookie(COOKIE_NAME, {path:'/',domain:'localhost',httpOnly:true,signed:true})
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        const token = createToken(user._id.toString(),user.email.toString(),'7d')
        res.cookie(COOKIE_NAME,token, {path:'/',domain:'localhost',expires,httpOnly:true,signed:true})

        return res.status(200).json({"message": "OK", user:user._id.toString()})
        return res.status(200).json({"messages": "OK", id: user._id.toString(), user});
    } catch (error) {
        return res.status(200).json({"messages": "OK", error})
    }
}