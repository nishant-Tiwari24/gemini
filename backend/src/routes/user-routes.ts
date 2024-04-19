import { Router } from "express";
import { getAllusers, userSignUp, userLogin } from "../controllers/user-controllers.js";

const userRoutes = Router();
userRoutes.get('/',getAllusers);
userRoutes.post('/signup',userSignUp);
userRoutes.post('/login',userLogin)

export default userRoutes;