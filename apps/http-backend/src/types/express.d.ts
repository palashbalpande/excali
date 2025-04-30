//import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  interface Request {
    userId?: string | JwtPayload;
  }
}
