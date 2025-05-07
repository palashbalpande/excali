import { prismaClient } from "@repo/database/client";
import { Request, Response } from "express";

export const room = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const room = await prismaClient.room.findFirst({
      where: {
        slug,
      },
    });
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }
    res.json({
      room,
    });
  } catch (err) {
    console.error("Error fetching room: ", err);
    res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
