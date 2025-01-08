const userService = require('../services/userService');

//회원가입 서비스
/*
  1. 이메일 중복 확인
  2. 비밀번호 암호화
  3. 사용자 생성
  4. 데이터베이스에 저장
  5. 토큰 생성
  6. 토큰 반환
  7. 사용자 정보 반환

  json:
  {
    email: string,
    password: string,
    name: string,
    login_method: string,
  }
*/
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

// 일반 로그인 서비스
/*
  1. 유저 조회
  2. 비밀번호 검증
  3. 토큰 생성
  4. 토큰 반환
  5. 사용자 정보 반환

  json:
  {
    email: string,
    password: string,
  }
*/  
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

// 유저 정보 조회 서비스
/*
  1. 유저 조회
  2. 유저 정보 반환

  - jwt토큰을 통해 유저 아이디를 조회
  - url에 userId 포함하지 않음
  json:
  {
    userId: string,
  }
*/
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

// 유저 정보 업데이트 서비스
/*
  1. 수정 가능한 필드만 추출
  2. 비밀번호 암호화
  3. 사용자 업데이트
  4. 사용자 반환

  * 사용자 정보 업데이트
  * @param {Object} req.body
  * @param {string} [req.body.name] - 변경할 이름 (선택사항)
  * @param {string} [req.body.password] - 변경할 비밀번호 (선택사항)
*/
async function updateUserInfo(req, res) {
  try {
    const userData = req.body;

    const updatedUser = await userService.updateUserInfo(req.user.id, userData);
    
    res.status(200).json({
      message: "사용자 정보가 성공적으로 업데이트되었습니다.",
      user: updatedUser
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to update user info",
    });
  }
}

// 유저 삭제 서비스
/*
  1. 유저 삭제
  2. 사용자 반환

  json:
  {
    userId: string,
  }
*/
async function deleteUser(req, res) {
  try {
    const deletedUser = await userService.deleteUser(req.user.id);
    res.status(200).json({
      message: "사용자가 성공적으로 삭제되었습니다.",
      user: deletedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to delete user",
    });
  }
}

module.exports = {
  register,
  emailLogin,
  googleLogin,
  getUserInfo,
  updateUserInfo,
  deleteUser,
};