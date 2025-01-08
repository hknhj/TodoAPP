const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// 회원가입
router.post('/register', userController.register);

// 일반 로그인
router.post('/email-login', userController.emailLogin);

// 유저 정보 조회
router.get('/user', verifyToken, userController.getUserInfo);

// 유저 정보 업데이트
router.patch('/user', verifyToken, userController.updateUserInfo);

// 유저 삭제
router.delete('/user', verifyToken, userController.deleteUser);

module.exports = router;