const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

console.log(SECRET_KEY);

// JWT 생성
function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

// JWT 검증
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = {
    generateToken,
    verifyToken,
}