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

async function emailLogin(req, res) {
  try{
    const loginData = req.body;

    // 로그인 서비스 호출출
    const result= await userService.login(loginData);

    // 성공 응답
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Login failed",
    });
  }
}

module.exports = {
  register,
  emailLogin,
};