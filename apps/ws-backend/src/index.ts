import "dotenv/config";
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getJwtUserCode } from "@repo/backend-common/getJwtUserCode";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";

  const JWT_USER_CODE = getJwtUserCode("JWT_USER_CODE");

  const decoded = jwt.verify(token, JWT_USER_CODE) as JwtPayload;

  // if (typeof decoded == "string") {
  //   ws.close();
  //   return;
  // }

  if (!decoded || !decoded.id) {
    ws.close();
    return;
  }

  ws.on("message", function message(data) {
    console.log("pong");
  });
});
