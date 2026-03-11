const express = require("express");
const { Router } = express;
const authController = require("../controllers/auth.controller");
const authmiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

authRouter.post("/register", authController.registerUser);

authRouter.post("/login", authController.loginUser);

authRouter.get("/logout", authController.logoutUser);

authRouter.get("/get-me", authmiddleware.authMiddleware, authController.getMe);

module.exports = authRouter;
