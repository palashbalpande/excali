import { IRouter, Router } from "express";
import {
  roomName,
  signInUser,
  signUpUser,
} from "../controllers/userController";
import {
  validateSignInSchema,
  validateSignUpSchema,
} from "@repo/common/validateZodTypes";
import { userMiddleware } from "../middlewares/userMiddleware";

export const userRouter: IRouter = Router();

userRouter.post("/signup", validateSignUpSchema, signUpUser);

userRouter.post("/signin", validateSignInSchema, signInUser);

userRouter.post("/room", userMiddleware, roomName);
