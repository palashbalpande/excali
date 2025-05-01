import { NextFunction, Request, Response } from "express";
import { getJwtUserCode } from "@repo/backend-common/getJwtUserCode";

export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JWT_USER_CODE = getJwtUserCode("JWT_USER_CODE");
    next();
  } catch (err) {
    console.error("Error login: ", err);
    res.status(403).json({
      message: "Login failed, Incorrect Creds",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const roomUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
