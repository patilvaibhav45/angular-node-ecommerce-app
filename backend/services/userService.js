const { updateUserValidation } = require("../middleware/validation");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

exports.updateUser = async (params) => {
  const { error } = updateUserValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { userId, fullName, email, password } = params;
  const user = await User.findById(userId).lean();
  if (!user) throw { message: "User not found", statusCode: 404 };
  const match = await bcrypt.compare(password.toString(), user.password);
  if (!match) throw { message: "Wrong credentials, please try again", statusCode: 400 };

  if (email === user.email && fullName === user.fname) {
    throw { message: "No new data has been provided", statusCode: 400 };
  }

  const update = {};
  if (email && email !== user.email) update.email = email;
  if (fullName && fullName !== user.fname) update.fname = fullName;

  const updated = await User.findByIdAndUpdate(userId, update, { new: true }).lean();
  return { message: "User details have been successfully updated", data: updated };
};
