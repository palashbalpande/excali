import "dotenv/config";
import { WebSocketServer } from "ws";
import type { WebSocket as WSWebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getJwtUserCode } from "@repo/backend-common/getJwtUserCode";
import { prismaClient } from "@repo/database/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WSWebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

const JWT_USER_CODE = getJwtUserCode("JWT_USER_CODE");

const checkUser = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_USER_CODE) as JwtPayload;

    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (err) {
    console.error("Error connectin to WebSocket");
    return null;
  }
};

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) return;

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data.toString());

    const user = users.find((x) => x.ws === ws);
    if (!user) return;

    if (parsedData.type === "join_room") {
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
