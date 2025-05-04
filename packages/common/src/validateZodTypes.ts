import { NextFunction, Request, Response } from "express";
import { userSignInSchema, userSignUpSchema } from "@repo/common/zodTypes";

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
};
