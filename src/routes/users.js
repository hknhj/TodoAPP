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

module.exports = router;