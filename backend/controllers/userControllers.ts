import { Request, Response } from "express-serve-static-core";
import asyncHandler from "../middleware/asyncHandler";
import User, { IUser } from "../models/userModel";
import jwt from 'jsonwebtoken';

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  const {email, password} = req.body;
  console.log(req.body)

  const user:  IUser | null = await User.findOne({email: email})
  if (user && (await user.matchPassword!(password))) {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {
      expiresIn: '14d'
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password')
  }
});

// @desc    Registration
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("register user");
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("logout user");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("get user profile");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("update user profile");
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/admin
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("get all users");
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/admin
const getUserById = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("get user profile by ID");
});

// @desc    Update user by admin
// @route   PUT /api/users/:id
// @access  Private/admin
const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("get user profile by ID");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/admin
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-store");
  res.send("delete user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
