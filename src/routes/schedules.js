const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// 모든 엔드포인트에 인증 미들웨어 적용
router.use(verifyToken);

// 일정 생성
router.post('/schedule', scheduleController.createSchedule);

// 모든 일정 조회
router.get('/schedule', scheduleController.getAllSchedules);

// 특정 일정 조회
router.get('/schedule/:scheduleId', scheduleController.getScheduleInfo);

// 특정 일정 수정
router.patch('/schedule/:scheduleId', scheduleController.updateSchedule);

// 특정 일정 삭제
router.delete('/schedule/:scheduleId', scheduleController.deleteSchedule);

module.exports = router;