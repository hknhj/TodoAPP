const userService = require('../services/userService');

exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id; // JWT에서 추출된 사용자 ID
    const userInfo = await userService.getUserById(userId);
    res.status(200).json(userInfo);
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await userService.registerUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};