import express from "express";
import Mentor from "../models/Mentor.js";
const router = express.Router();

// Get all mentors
router.get("/", async (req, res) => {
  const mentors = await Mentor.find();
  res.json(mentors);
});

// Add a mentor
router.post("/", async (req, res) => {
  const newMentor = new Mentor(req.body);
  await newMentor.save();
  res.json(newMentor);
});

// Toggle follow
router.put("/:id/follow", async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);
  mentor.followed = !mentor.followed;
  await mentor.save();
  res.json(mentor);
});

export default router;
