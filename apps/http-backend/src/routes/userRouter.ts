import { IRouter, Router } from "express";
import {
  roomUser,
  signInUser,
  signUpUser,
} from "../controllers/userController";

export const userRouter: IRouter = Router();

userRouter.post("/signup", signUpUser);

userRouter.post("/signin", signInUser);

userRouter.post("/room", roomUser);
