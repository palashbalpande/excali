import { IRouter, Router } from "express";
import { userRouter } from "./userRouter";

export const indexRouter: IRouter = Router();

indexRouter.use("/user", userRouter);
