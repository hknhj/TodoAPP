const express = require('express');
const userRoutes = require('./users');
const todoRoutes = require('./todos');
const scheduleRoutes = require('./schedules');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/schedules', scheduleRoutes);

module.exports = router;