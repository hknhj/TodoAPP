const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

// 회원가입
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
}

// 일반 로그인
async function emailLogin(req, res) {
  try{
    const loginData = req.body;

    // 로그인 서비스 호출
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

// 구글 로그인
async function googleLogin(req, res) {
  try {
    const loginData = req.body;

    // 로그인 서비스 호출
    const result = await userService.googleLogin(loginData);

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

// 유저 정보 조회
async function getUserInfo(req, res) {
  try {
    // 토큰 검증은 미들웨어에서 검증되어 있음
    const user = await userService.getUserInfo(req.user.id);
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to get user info",
    });
  }
}

// 유저 정보 업데이트
async function updateUserInfo(req, res) {
  try {
    const userData = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: '인증 토큰이 필요합니다.'
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to update user info",
    });
  }
}

module.exports = {
  register,
  emailLogin,
  googleLogin,
  getUserInfo,
};