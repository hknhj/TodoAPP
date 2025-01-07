const http = require("http")
const app = require("./app")
const connectDB = require("./config/db")

// MongoDB 연결
connectDB();

// 서버 실행
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});