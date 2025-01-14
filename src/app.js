const express = require("express")
const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todos");
const scheduleRoutes = require("./routes/schedules");
require("dotenv").config();

const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/schedules", scheduleRoutes);

// 기본 경로
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

module.exports = app;