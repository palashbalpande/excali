import { IRouter, Router } from "express";
import {
  roomUser,
  signInUser,
  signUpUser,
} from "../controllers/userController";
import { validateSignUpSchema } from "../middlewares/validateUserSchema";
import { userMiddleware } from "../middlewares/userMiddleware";

export const userRouter: IRouter = Router();

userRouter.post("/signup", validateSignUpSchema, signUpUser);

userRouter.post("/signin", signInUser);

userRouter.post("/room", userMiddleware, roomUser);
