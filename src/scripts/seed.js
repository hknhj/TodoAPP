require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Todo = require("../models/todoModel");
const Schedule = require("../models/scheduleModel");

const MONGO_URI = process.env.MONGO_URI;

// 샘플 데이터
const sampleUsers = [
    {
      email: "example1@example.com",
      password: "password123",
      name: "John Doe",
      login_method: "email",
    },
    {
      email: "example2@example.com",
      password: "password456",
      name: "Jane Smith",
      login_method: "google",
    },
  ];  

async function seedDatabase() {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected");

      // 기존 데이터 삭제
      await User.deleteMany({});
      await Todo.deleteMany({});
      await Schedule.deleteMany({});
      console.log("Existing data cleared");

      // 샘플 데이터 삽입
      await User.insertMany(sampleUsers);
      console.log("User collection seeded");

    } catch (err) {
      console.error("Error seeding database:", err);
    } finally {
      mongoose.connection.close();
    }
  }
  
  seedDatabase();