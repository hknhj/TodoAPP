const express = require("express")
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
app.use("/api/users", userRoutes);

// 기본 경로
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

module.exports = app;