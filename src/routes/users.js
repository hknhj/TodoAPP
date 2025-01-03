const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// 유저 정보 조회
router.get('/me', authMiddleware, userController.getUserInfo);

// 회원가입
router.post('/register', userController.registerUser);

module.exports = router;