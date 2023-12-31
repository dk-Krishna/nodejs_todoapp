import User from "../models/user.js";
import bcrypt from "bcrypt";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";

export const testingcontroller = (req, res, next) => {
  res.send("Working fine...");
};

export const registeruser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 400));
  
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendToken(res, user, "Registered Successfully", 201);
};

export const loginuser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 404));

  sendToken(res, user, `Welcome back, ${user.name}`, 200);
};

export const getmyprofile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "Loggedout Successfully",
    });
};
