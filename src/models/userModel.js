const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      maxlength: 100,
    },
    password: { 
      type: String,
      required: function () {
        return this.login_method === "email"; // 이메일 로그인일 경우 필수
      },
      minlength: 6,
      maxlength: 100,
    },
    name: { 
      type: String, 
      required: true,
      maxlength: 100,
    },
    login_method: {
      type: String,
      required: true,
      enum: ["email", "google"], // 로그인 방식 제한
    },
  },
  {
    timestamps: true, // createdAt과 updatedAt 자동 관리
  }
);

module.exports = mongoose.model('User', userSchema);