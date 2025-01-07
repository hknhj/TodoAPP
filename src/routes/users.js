const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// 회원가입
router.post('/register', userController.register);

// 일반 로그인
router.post('/email-login', userController.emailLogin);

module.exports = router;