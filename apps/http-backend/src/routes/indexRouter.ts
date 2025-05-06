import { IRouter, Router } from "express";
import { userRouter } from "./userRouter.js";
import { chatsRouter } from "./chatsRouter.js";

export const indexRouter: IRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/chats", chatsRouter);
