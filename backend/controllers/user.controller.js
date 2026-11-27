import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    //updating user by writing let instead of const
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
  } catch (error) {}
};

//login started
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesnt matches with current role.",
        success: false,
      });
    }

    // token data is created to insert in token variable
    const tokenData = {
      userId: user._id,
    };

    // token variable is created
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

   user={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile
   }

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, success: true });
  } catch (error) {}
};
