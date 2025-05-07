import { IRouter, Router } from "express";
import { room } from "../controllers/roomController.js";

export const roomRouter: IRouter = Router();

roomRouter.get("/:slug", room);
