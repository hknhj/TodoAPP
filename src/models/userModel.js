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
      maxlength: 100,
    },
    name: { 
      type: String, 
      required: true,
      maxlength: 100,
    },
    created_at: {
      type: Date,
      default: Date.now, // 생성 시 자동으로 설정
    },
    updated_at: {
      type: Date,
      default: Date.now, // 수정 시 자동 업데이트
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