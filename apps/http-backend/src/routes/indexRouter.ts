import { IRouter, Router } from "express";
import { userRouter } from "./userRouter.js";
import { chatsRouter } from "./chatsRouter.js";
import { roomRouter } from "./roomRouter.js";

export const indexRouter: IRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/chats", chatsRouter);
indexRouter.use("/room", roomRouter);
