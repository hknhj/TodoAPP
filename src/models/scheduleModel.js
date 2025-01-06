const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
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
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      default: null,
      maxlength: 100,
    },
    is_recurring: {
      type: Boolean,
      default: false,
    },
    recurrence_rule: {
      type: String,
      default: null, // 반복 규칙
    },
    status: {
      type: String,
      default: "upcoming",
      enum: ["upcoming", "ongoing", "completed"], // 일정 상태 제한
    },
  },
  {
    timestamps: true, // createdAt과 updatedAt 자동 관리
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
