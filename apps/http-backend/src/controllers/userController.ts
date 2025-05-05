import { Request, Response } from "express";
import { getJwtUserCode } from "@repo/backend-common/getJwtUserCode";
import { prismaClient } from "@repo/database/client";
import { RoomBody, SignInBody, SignUpBody } from "@repo/common/zodTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const signUpUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body as SignUpBody;
  const hashedPassword = await bcrypt.hash(password, 8);
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      res.status(409).json({
        message: "Email already exist",
      });
      return;
    }

    const newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        photo: "abc.jpg"
      },
    });

    res.status(201).json({
      message: "User Created",
      user: newUser,
    });
  } catch (err) {
    console.error("Error during SignUp", err);
    res.status(409).json({
      message: "User already exists",
      error: err instanceof Error ? err.message : "Unknown Error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as SignInBody;
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "Invalid Credentials",
      });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid creds" });
      return;
    }

    const JWT_USER_CODE = getJwtUserCode("JWT_USER_CODE");

    const token = jwt.sign({ userId: user.id }, JWT_USER_CODE);

    res.json({ message: "Login Succeeded", token });
  } catch (err) {
    console.error("Error login: ", err);
    res.status(403).json({
      message: "Login failed, Incorrect Creds",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};

export const roomName = async (req: Request, res: Response) => {
  const { roomName } = req.body as RoomBody;
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Invalid userId",
    });
    return;
  }
  try {
    const slug = `${roomName.toLowerCase().replace(/\s+/g, "-")} - ${uuidv4().substring(0, 8)}`;
    const newRoom = await prismaClient.room.create({
      data: {
        slug: slug,
        roomName: roomName,
        adminId: userId,
      },
    });
    res.status(201).json({
      message: "Room created successfully",
      room: newRoom,
    });
  } catch (err) {
    console.error("Error creating room", err);
    res.status(500).json({
      message: "Failed to create room",
      error: err instanceof Error ? err.message : "Unknwon error",
    });
  } finally {
    await prismaClient.$disconnect();
  }
};
