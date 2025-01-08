const todoService = require('../services/todoService');

// 할일 생성 서비스
/*
...
*/
async function createTodo(req, res) {
    try {
        if (!req.body.title || !req.body.due_date) {
            return res.status(400).json({
                message: "제목, 상태, 마감일은 필수 입력 항목입니다."
            });
        }
        
        const todoData = {
            ...req.body,
            user_id: req.user.id  // JWT 토큰에서 얻은 사용자 ID 추가
        };

        const todo = await todoService.createTodo(todoData);
        res.status(201).json({
            message:  "할 일이 성공적으로 생성되었습니다",
            todo
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message || "할 일 생성에 실패했습니다"
        });
    }
}

module.exports = {
    createTodo,
};