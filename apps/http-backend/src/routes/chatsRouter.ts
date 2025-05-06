import { IRouter, Router } from "express";
import { chats } from "../controllers/chatsController.js";

export const chatsRouter: IRouter = Router();

chatsRouter.get("/:roomId", chats);
