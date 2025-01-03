const userModel = require('../models/userModel');

exports.getUserById = async (userId) => {
  return await userModel.findById(userId);
};

exports.registerUser = async (userData) => {
  return await userModel.create(userData);
};
