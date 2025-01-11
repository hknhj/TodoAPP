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

// 할일 전체 조회 서비스
/*
...
*/
async function getTodoAllInfo(req, res) {
    try{
        const todoAllData = await todoService.getTodoAllInfo(req.user.id);
        res.status(200).json({
            todoAllData,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || "할 일 조회에 실패했습니다."
        });
    }
}

// 할일 개별 조회 서비스
/*
...
*/
async function getTodoInfo(req, res) {
    try{
        const userId = req.user.id;
        const todoId = req.params.id;

        const todoData = await todoService.getTodoInfo(userId, todoId);

        res.status(200).json({
            todoData,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || "할 일 조회에 실패했습니다."
        });
    }
}


module.exports = {
    createTodo,
    getTodoAllInfo,
    getTodoInfo,
};