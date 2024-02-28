import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel";
import { UserResponse } from "../types";

export interface CustomRequest extends Request {
  user: UserResponse;
}

//Protect routes
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;
        const user = await User.findById(decoded.userId).select("-password");
        (req as CustomRequest).user = user!
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

const admin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as CustomRequest).user
  const isAdmin = (req as CustomRequest).user.isAdmin
  if (user && isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
