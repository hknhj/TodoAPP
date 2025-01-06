const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User 모델과 참조 관계
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      required: true,
      enum: ["Not done", "completed"], // 상태 값 제한
    },
    due_date: {
      type: Date,
      required: true,
    },
    is_recurring: {
      type: Boolean,
      required: true,
      default: false,
    },
    recurrence_rule: {
      type: String,
      default: null, // 반복 규칙
    },
    completed_at: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      default: null,
      maxlength: 100,
    },
  },
  {
    timestamps: true, // createdAt과 updatedAt 자동 관리
  }
);

module.exports = mongoose.model("Todo", todoSchema);
