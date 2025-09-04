import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  image: { type: String, default: "/default-task.png" },
  progress: { type: Number, default: 0 },
  timeLeft: String,
  team: [String],
  subtasks: [String],
  submission: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending"
  }
});

export default mongoose.model("Task", taskSchema);
