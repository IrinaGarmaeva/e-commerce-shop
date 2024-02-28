import { Request } from "express";
import { Document } from "mongoose";

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface CustomRequest extends Request {
  user: UserResponse;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword?: (enteredPassword: string) => Promise<boolean>;
}

