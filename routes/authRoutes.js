import express from "express";
import { upload } from "../config/multerConfig.js";
import { loginController, signupController } from "../controllers/authController.js";

const AuthRouter = express.Router()

AuthRouter.post("/signup" , [upload.single("image")] , signupController)
AuthRouter.post("/login",  loginController)

export default AuthRouter