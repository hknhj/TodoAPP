const express = require("express")
const routes = require("./routes")
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 연결
app.use('/api', routes);

// 에러 핸들러
app.use(errorHandler);

module.exports = app;