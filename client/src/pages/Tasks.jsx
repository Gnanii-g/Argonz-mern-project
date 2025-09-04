// src/pages/Tasks.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Menu, Star } from "lucide-react";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(""); // e.g. "all", "0-50", "51-80", "81-100"
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://argonz-mern-project.onrender.com/api/tasks")
            .then((res) => setTasks(res.data))
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    // Filter and search logic
    const filteredTasks = useMemo(() => {
        let filtered = tasks;

        // Search by title (case-insensitive)
        if (search.trim()) {
            filtered = filtered.filter((t) =>
                t.title?.toLowerCase().includes(search.trim().toLowerCase())
            );
        }

        // Filter by progress percentage
        if (filter === "0-50") {
            filtered = filtered.filter((t) => (t.progress || 0) <= 50);
        } else if (filter === "51-80") {
            filtered = filtered.filter((t) => (t.progress || 0) > 50 && (t.progress || 0) <= 80);
        } else if (filter === "81-100") {
            filtered = filtered.filter((t) => (t.progress || 0) > 80);
        }

        return filtered;
    }, [tasks, search, filter]);

    // Dummy rating generator (replace with real rating if available)
    const getDummyRating = (id) => {
        // Generates a pseudo-random rating between 3 and 5
        return (3 + (parseInt(id.slice(-2), 16) % 3) + 0.5).toFixed(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 md:ml-64 p-6 transition-all">
                <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold">Tasks</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
                        {/* Search Box */}
                        <input
                            type="text"
                            placeholder="Search by task name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-64"
                        />

                        {/* Filter Dropdown */}
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">All Progress</option>
                            <option value="0-50">0-50% Complete</option>
                            <option value="51-80">51-80% Complete</option>
                            <option value="81-100">81-100% Complete</option>
                        </select>

                        <button
                            onClick={() => navigate("/tasks/new")}
                            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 whitespace-nowrap"
                        >
                            + Add Task
                        </button>
                    </div>
                </header>

                {/* Task Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((t) => (
                        <article
                            key={t._id}
                            onClick={() => navigate(`/tasks/${t._id}`)}
                            className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={t.image || "/default-task.png"}
                                alt={t.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{t.title}</h3>
                                <p className="text-sm text-gray-500">{t.category}</p>

                                {/* Ratings */}
                                <div className="flex items-center gap-1 mt-2 mb-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-medium text-yellow-600">
                                        {getDummyRating(t._id)}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-1">/ 5.0</span>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-black h-2 rounded-full"
                                            style={{ width: `${t.progress || 0}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {t.progress || 0}% complete
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
                {filteredTasks.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">No tasks found.</div>
                )}
            </main>
        </div>
    );
}
