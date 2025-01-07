const userService = require('../services/userService');

async function register(req, res) {
  try {
    const userData = req.body;

    // 서비스 계층 호출
    const newUser = await userService.registerUser(userData);

    // 성공 응답
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        login_method: newUser.login_method,
      },
    });
  } catch (err) {
    // 에러 응답
    res.status(400).json({
      message: err.message || "Failed to register user",
    });
  }
};