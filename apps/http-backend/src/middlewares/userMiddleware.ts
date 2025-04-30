import { NextFunction, Request, Response } from "express";
import { getJwtUserCode } from "../utils/getJwtUserCode";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  if (!header) {
    res.status(401).json({
      message: "Unauthorized header",
    });
    return;
  }

  let token: string | undefined = header;
  if (header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      message: "Unauthorized token",
    });
    return;
  }

  const JWT_USER_CODE = getJwtUserCode("JWT_USER_CODE");

  try {
    const decoded = jwt.verify(token as string, JWT_USER_CODE) as JwtPayload;

    if (!decoded.id) {
      res.status(403).json({ message: "Unauthorized user" });
      return;
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Unauthorized" });
  }
};
