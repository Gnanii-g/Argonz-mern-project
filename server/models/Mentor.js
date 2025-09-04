import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: String,
  avatar: { type: String, default: "/default-avatar.png" },
  tasks: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  followed: { type: Boolean, default: false },
});

export default mongoose.model("Mentor", mentorSchema);
