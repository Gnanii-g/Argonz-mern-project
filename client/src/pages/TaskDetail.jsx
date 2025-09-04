// src/pages/TaskDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Menu, X } from "lucide-react"; // You may need to install lucide-react or use any icon library

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tasks/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => console.error("Error fetching task:", err));
  }, [id]);

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`http://localhost:5000/api/tasks/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  if (!task) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-0 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
          {/* Menu button (mobile) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* Task Title */}
          <h1 className="text-xl font-bold flex-1 text-center md:text-left">
            Task Details
          </h1>
          {/* Search */}
         
          {/* Exit/Close button (desktop & mobile) */}
          <button
            className="ml-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="max-w-6xl mx-auto w-full p-6 flex-1">
          {/* Hero image */}
          <img
            src={task.image || "https://picsum.photos/1200/400?random=1"}
            alt={task.title}
            className="w-full h-64 object-cover rounded-xl shadow"
          />

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left - Task Info */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-2xl font-bold">{task.title}</h1>
              <p className="text-gray-600">{task.category}</p>
              <p className="text-gray-500">{task.description || "No description provided."}</p>

              {/* Subtasks */}
              {task.subtasks?.length > 0 && (
                <div>
                  <h2 className="font-semibold mb-2">Subtasks</h2>
                  <ul className="list-disc ml-6 text-gray-600">
                    {task.subtasks.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* File Upload */}
              <div className="mt-6">
                <h2 className="font-semibold mb-2">Submit Work</h2>
                <div
                  className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center cursor-pointer hover:border-black"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {file ? (
                    <p className="text-sm text-gray-600">{file.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                {file && (
                  <button
                    onClick={handleFileUpload}
                    className="mt-3 px-4 py-2 bg-black text-white rounded-lg"
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>

            {/* Right - Sidebar Info */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <h2 className="font-semibold mb-2">Task Info</h2>
                <p>Status: {task.status}</p>
                <p>Time Left: {task.timeLeft || "N/A"}</p>
                <p>Progress: {task.progress || 0}%</p>
              </div>

              {task.team?.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <h2 className="font-semibold mb-2">Assigned Team</h2>
                  <div className="flex flex-wrap gap-2">
                    {task.team.map((member, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-black text-white text-sm"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
