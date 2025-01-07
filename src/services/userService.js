const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");

//회원가입 서비스
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

module.exports = {
  registerUser,
  login,
};
