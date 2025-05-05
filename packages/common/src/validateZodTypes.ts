import type { Request, Response, NextFunction } from "express";

import {
  createRoomSchema,
  userSignInSchema,
  userSignUpSchema,
} from "@repo/common/zodTypes";

export const validateSignUpSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = userSignUpSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Email taken OR Incorrect inputs",
      error: validation.error?.format(),
    });
    return;
  }
  next();
};

export const validateSignInSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = userSignInSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Incorrect inputs",
      error: validation.error?.format(),
    });
  }
  next();
};

export const validateRoomName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = createRoomSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({
      message: "Minimum 3 letters required",
      error: validation.error?.format(),
    });
  }
};
