const scheduleService = require('../services/scheduleService');

// 일정 생성
async function createSchedule(req, res) {
    try {
        const scheduleData = {
            ...req.body,
            user_id: req.user.id
        };
        const schedule = await scheduleService.createSchedule(scheduleData);
        res.status(201).json({
            message: "일정이 성공적으로 생성되었습니다",
            schedule
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
}

// 모든 일정 조회
async function getAllSchedules(req, res) {
    try {
        const schedules = await scheduleService.getAllSchedules(req.user.id);
        res.status(200).json({ 
            schedules 
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
}

// 특정 일정 조회
async function getScheduleInfo(req, res) {
    try {
        const schedule = await scheduleService.getScheduleById(req.params.scheduleId, req.user.id);
        if (!schedule) {
            return res.status(404).json({ 
                message: "일정을 찾을 수 없습니다" 
            });
        }
        res.status(200).json({ 
            schedule 
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
}

// 일정 수정
async function updateSchedule(req, res) {
    try {
        const schedule = await scheduleService.updateSchedule(
            req.params.scheduleId,
            req.user.id,
            req.body
        );
        res.status(200).json({
            message: "일정이 성공적으로 수정되었습니다",
            schedule
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
}

// 일정 삭제
async function deleteSchedule(req, res) {
    try {
        await scheduleService.deleteSchedule(req.params.scheduleId, req.user.id);
        res.status(200).json({ 
            message: "일정이 성공적으로 삭제되었습니다" 
        });
    } catch (err) {
        res.status(400).json({ 
            message: err.message 
        });
    }
}

module.exports = {
    createSchedule,
    getAllSchedules,
    getScheduleInfo,
    updateSchedule,
    deleteSchedule
};

