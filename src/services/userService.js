const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");

async function registerUser(userData) {
  const { email, password, name, login_method } = userData;

  // 이메일 중복 확인
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 비밀번호 암호화 (이메일 로그인인 경우)
  const hashedPassword =
    login_method === "email" ? await bcrypt.hash(password, 10) : null;

  // 사용자 생성
  const newUser = new User({
    email,
    password: hashedPassword,
    name,
    login_method,
  });

  // 데이터베이스에 저장
  return await newUser.save();
}

async function login(loginData) {
  const {email, password} = loginData;

  // 유저 조회
  const user = await User.findOne({email});
  if (!user){
    throw new Error("User not found");
  }

  // 비밀번호 검증
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    throw new Error("Invalid credentials");
  }

  // JWT 생성
  const token = generateToken({id: user._id, email: user.email})

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
}

async function googleLogin(loginData) {
  const {email, name} = loginData;

  // 유저 조회
  const user = await User.findOne({email});
  if (!user){
    throw new Error("User not found");
  }

  // JWT 생성
  const token = generateToken({id: user._id, email: user.email})

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
}

async function getUserInfo(userId) {
  const user = await User.findById(userId);
  if (!user){
    throw new Error("User not found");
  }
  return user;
}

async function updateUserInfo(userId, userData) {
  // 수정 가능한 필드만 추출
  const allowedUpdates = {};
  
  if (userData.password) {
    // 비밀번호가 제공된 경우 해시화
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    allowedUpdates.password = hashedPassword;
  }
    
  if (userData.name) {
    allowedUpdates.name = userData.name;
  }

  // 업데이트 가능한 필드만 사용하여 사용자 업데이트
  const user = await User.findByIdAndUpdate(
    userId, 
    allowedUpdates, 
    { 
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

async function deleteUser(userId) {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

module.exports = {
  registerUser,
  login,
  googleLogin,
  getUserInfo,
  updateUserInfo,
  deleteUser,
};
