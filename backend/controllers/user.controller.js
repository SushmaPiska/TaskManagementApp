import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email });

    if (user) {
      console.log("User already exists");
      return res.status(400).json({ error: "Username already exists" });
    }

    //hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate jwt token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid  user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const token = generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getUserbyEmail=async(req,res)=>{
//   try {
//     const email=req.params.email;
//   const user=await User.findOne({email})
//   if(!user){
//     return res.status(404).json({message:"User not found"});
//   }

//   res.status(200).json(user);
//   } catch (error) {
//     console.log("error in getEmailByUser controller");
//     res.status(500).json({ message: "Server error", error });
//   }
// }

//select users from

//select all  users

export const updateUserName = async (req,res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user = await User.findByIdAndUpdate(id, { name }, { new: true });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "name not updated" });
  }
};
export const updateUserEmail = async (req,res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user = await User.findByIdAndUpdate(id, { email }, { new: true });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "email not updated" });
  }
};


export const updateUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isOldMatched = await bcryptjs.compare(oldPassword, user.password || "");
    if (!isOldMatched) {
      return res.status(400).json({ message: "Old password mismatch" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({ message: "Old and new passwords cannot be the same" });
    }

    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    user = await User.findByIdAndUpdate(id, { password: hashedNewPassword }, { new: true });
   

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error updating password:", error);
    res.status(400).json({ message: "Password not updated" });
  }
};


export const getUsers = () => {};
