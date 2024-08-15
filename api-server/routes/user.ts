import express from "express";

import userController from "../controllers/user";

const userRouter = express.Router();

userRouter
  .post("/signup", userController.signUp)
  .post("/signin", userController.signIn);

export default userRouter;
