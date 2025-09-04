import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
        category,
        image,
      });
      console.log("Task created:", res.data);
      navigate("/tasks"); // go back to list
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
        />
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Save Task
        </button>
      </form>
    </div>
  );
}
