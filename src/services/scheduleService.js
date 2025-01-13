const Schedule = require('../models/scheduleModel');

// 일정 생성
async function createSchedule(scheduleData) {
    try {

        // 필수 필드 확인
        if (!scheduleData.title || !scheduleData.start_time || !scheduleData.end_time) {
            throw new Error('제목, 시작 시간, 종료 시간은 필수 입력 항목입니다.');
        }

        const schedule = new Schedule({
            // 필수 필드
            user_id: scheduleData.user_id,
            title: scheduleData.title,
            start_time: new Date(scheduleData.start_time),
            end_time: new Date(scheduleData.end_time),
            
            // 선택적 필드 (있는 경우에만 포함)
            ...(scheduleData.description && { description: scheduleData.description }),
            ...(scheduleData.location && { location: scheduleData.location }),
            ...(scheduleData.is_recurring && { is_recurring: scheduleData.is_recurring }),
            ...(scheduleData.recurrence_rule && { recurrence_rule: scheduleData.recurrence_rule })
        });

        await validateScheduleTimes(schedule.start_time, schedule.end_time);
        
        const savedSchedule = await schedule.save();
        return await savedSchedule.populate('user_id', 'name email');
    } catch (error) {
        throw new Error('일정 생성 실패: ' + error.message);
    }
}

// 사용자의 모든 일정 조회
async function getAllSchedules(userId) {
    return await Schedule.find({ user_id: userId })
        .populate('user_id', 'name email')
        .sort({ start_time: 1 });
}

// 특정 일정 조회
async function getScheduleById(scheduleId, userId) {
    const schedule = await Schedule.findOne({
        _id: scheduleId,
        user_id: userId
    }).populate('user_id', 'name email');
    
    if (!schedule) {
        throw new Error('일정을 찾을 수 없습니다');
    }
    return schedule;
}

// 일정 수정
async function updateSchedule(scheduleId, userId, updateData) {
    if (updateData.start_time && updateData.end_time) {
        await validateScheduleTimes(
            new Date(updateData.start_time),
            new Date(updateData.end_time)
        );
    }

    const schedule = await Schedule.findOneAndUpdate(
        { _id: scheduleId, user_id: userId },
        updateData,
        { new: true, runValidators: true }
    ).populate('user_id', 'name email');

    if (!schedule) {
        throw new Error('일정을 찾을 수 없습니다');
    }
    return schedule;
}

// 일정 삭제
async function deleteSchedule(scheduleId, userId) {
    const result = await Schedule.findOneAndDelete({
        _id: scheduleId,
        user_id: userId
    });
    
    if (!result) {
        throw new Error('일정을 찾을 수 없습니다');
    }
}

// 시간 유효성 검사 헬퍼 함수
async function validateScheduleTimes(startTime, endTime) {
    if (startTime >= endTime) {
        throw new Error('종료 시간은 시작 시간보다 늦어야 합니다');
    }
}

module.exports = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
};

