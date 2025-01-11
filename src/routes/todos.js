const express = require('express');
const todoController = require('../controllers/todoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// 할 일 생성
router.post('/todo', verifyToken, todoController.createTodo);

// 할 일 전체 조회
router.get('/todo', verifyToken, todoController.getTodoAllInfo);

// 할 일 개별 조회
router.get('/todo/:id', verifyToken, todoController.getTodoInfo);

module.exports = router;
