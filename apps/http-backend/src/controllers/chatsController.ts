import { prismaClient } from "@repo/database/client";
import { Request, Response } from "express";

export const chats = async (req: Request, res: Response) => {
  try {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });

    res.json({
      messages,
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
