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

// 할 일 수정
router.patch('/todo/:id', verifyToken, todoController.updateTodo);

// 할 일 삭제
router.delete('/todo/:id', verifyToken, todoController.deleteTodo);

module.exports = router;
