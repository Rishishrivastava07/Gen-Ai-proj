const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/blacklist.model");

function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };
}

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please provide name, email and password.",
    });
  }
  const isUserExist = await userModel.findOne({
    $or: [{ name }, { email }],
  });
  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists.",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password.",
    });
    return;
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);

  if (!isPasswordvalid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, getCookieOptions());

  res.status(200).json({
    message: "User logged in successfully.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie("token", getCookieOptions());
  res.status(200).json({
    message: "User logged out successfully.",
  });
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
      message: "User fetched successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
}

module.exports = { registerUser, loginUser, logoutUser, getMe };
