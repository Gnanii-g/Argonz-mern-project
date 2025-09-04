import React, { useState } from "react";
import axios from "axios";

export default function AddMentor() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    avatar: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://argonz-mern-project.onrender.com/api/mentors", formData);
      alert("Mentor added successfully!");
      setFormData({ name: "", role: "", bio: "", avatar: "" });
    } catch (err) {
      alert("Error adding mentor");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl w-96 mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Add Mentor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g. Fullstack Developer)"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add Mentor
        </button>
      </form>
    </div>
  );
}
