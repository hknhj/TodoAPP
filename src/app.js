const express = require("express")

const app = express();

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

module.exports = app;