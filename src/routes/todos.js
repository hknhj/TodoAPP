const express = require('express');
const todoController = require('../controllers/todoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// 할 일 생성
router.post('/todo', verifyToken, todoController.createTodo);

module.exports = router;
