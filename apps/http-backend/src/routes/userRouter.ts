import { IRouter, Router } from "express";
import {
  roomName,
  signInUser,
  signUpUser,
} from "../controllers/userController.js";
import {
  validateSignInSchema,
  validateSignUpSchema,
} from "@repo/common/validateZodTypes";
import { userMiddleware } from "../middlewares/userMiddleware.js";

export const userRouter: IRouter = Router();

userRouter.post("/signup", validateSignUpSchema, signUpUser);

userRouter.post("/signin", validateSignInSchema, signInUser);

userRouter.post("/room", userMiddleware, roomName);
