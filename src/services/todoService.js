const Todo = require('../models/todoModel');

async function createTodo(todoData) {
    try {

        const todo = new Todo({
            user_id: todoData.user_id,
            title: todoData.title,
            status: "Not done",
            due_date: todoData.due_date,

            ...(todoData.description && { description: todoData.description }),
            ...(todoData.is_recurring && { is_recurring: todoData.is_recurring }),
            ...(todoData.recurrence_rule && { recurrence_rule: todoData.recurrence_rule }),
            ...(todoData.category && { category: todoData.category })
        });

        // 저장 및 반환
        const savedTodo = await todo.save();
        
        // populate를 사용하여 user 정보 포함
        return await savedTodo.populate('user_id', 'name email');
        
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new Error('할 일 데이터가 유효하지 않습니다: ' + error.message);
        }
        throw new Error('할 일 생성 중 오류가 발생했습니다: ' + error.message);
    }
}

async function getTodoAllInfo(userId) {
    const todos = await Todo.find({ user_id: userId });

    return todos;
}

async function getTodoInfo(userId, todoId) {
    console.log(userId, todoId);

    const todo = await Todo.findOne({ _id: todoId, user_id: userId});

    if (!todo) {
        throw new Error("Todo not found for access denied");
    }

    return todo;
}

module.exports = {
    createTodo,
    getTodoAllInfo,
    getTodoInfo,
};