const app = require("./app")
const { PORT } = require("./config/env"); // 환경 변수에서 PORT 가져오기

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});