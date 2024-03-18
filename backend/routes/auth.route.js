import express from "express";
import { authController } from "../controllers";
import { authMiddleware } from "../middlewares";
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authMiddleware.verifyToken, authController.logout);

export default authRouter;