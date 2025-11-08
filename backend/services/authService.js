const {
  loginValidation,
  registerValidation,
} = require("../middleware/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

exports.loginUser = async (params) => {
  const { error } = loginValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { email, password } = params;
  // Find user by email then compare password using bcrypt
  const user = await User.findOne({ email }).lean();
  if (!user) throw { message: "Wrong credentials, please try again", statusCode: 400 };
  const match = await bcrypt.compare(password.toString(), user.password);
  if (!match) throw { message: "Wrong credentials, please try again", statusCode: 400 };
  if (!user) throw { message: "Wrong credentials, please try again", statusCode: 400 };

  const token = jwt.sign({ data: user }, process.env.JWT_SECRET || "secret");
  return { message: "Logged in successfully", data: user, token };
};

exports.registerUser = async (params) => {
  const { error } = registerValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { fullName, email, password } = params;
  const hashedPassword = await bcrypt.hash(password.toString(), 10);

  // Check if user exists
  const existing = await User.findOne({ email }).lean();
  if (existing) throw { message: "Email address is in use, please try a different one", statusCode: 400 };

  const newUser = new User({ fname: fullName, email, password: hashedPassword });
  const saved = await newUser.save();
  const token = jwt.sign({ data: saved }, process.env.JWT_SECRET || "secret");
  return { data: saved, message: "You have successfully registered.", token, statusCode: 200 };
};
