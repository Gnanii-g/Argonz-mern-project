import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  ListTodo,
  Users,
  MessageCircle,
  Settings,
  Bell,
  Menu,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Navigation items for sidebar
// -----------------------------------------------------------------------------
const navItems = [
  { label: "Overview", icon: <Home size={18} />, key: "overview" },
  { label: "Task", icon: <ListTodo size={18} />, key: "task" },
  { label: "Mentors", icon: <Users size={18} />, key: "mentors" },
  { label: "Message", icon: <MessageCircle size={18} />, key: "message" },
  { label: "Settings", icon: <Settings size={18} />, key: "settings" },
];

// -----------------------------------------------------------------------------
// Dummy activity data for the weekly chart
// -----------------------------------------------------------------------------
const activityData = [
  { name: "S", tasks: 1 },
  { name: "M", tasks: 2 },
  { name: "T", tasks: 3 },
  { name: "W", tasks: 2 },
  { name: "T", tasks: 3 },
  { name: "F", tasks: 2 },
  { name: "S", tasks: 1 },
];

// -----------------------------------------------------------------------------
// Dummy tasks (used until backend data loads)
// -----------------------------------------------------------------------------
const dummyTasks = [
  {
    _id: "1",
    title: "Design UI Dashboard",
    category: "Design",
    image: "https://via.placeholder.com/400x200?text=UI+Dashboard",
  },
  {
    _id: "2",
    title: "Implement Login API",
    category: "Development",
    image: "https://via.placeholder.com/400x200?text=Login+API",
  },
  {
    _id: "3",
    title: "Database Schema Setup",
    category: "Backend",
    image: "https://via.placeholder.com/400x200?text=DB+Schema",
  },
  {
    _id: "4",
    title: "Testing Workflow",
    category: "QA",
    image: "https://via.placeholder.com/400x200?text=Testing",
  },
];

// -----------------------------------------------------------------------------
// Dashboard Component
// -----------------------------------------------------------------------------
export default function Dashboard() {
  // ---------------------------------------------------------------------------
  // State hooks
  // ---------------------------------------------------------------------------
  const [mentors, setMentors] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState(dummyTasks); // start with dummy
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");

  const navigate = useNavigate();

  // ---------------------------------------------------------------------------
  // Fetch mentors & tasks from backend
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Fetch mentors
    axios
      .get("https://argonz-mern-project.onrender.com/api/mentors")
      .then((res) => setMentors(res.data))
      .catch((err) => console.error("Error fetching mentors:", err));

    // Fetch tasks
    axios
      .get("https://argonz-mern-project.onrender.com/api/tasks")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setUpcomingTasks(res.data); // override dummy tasks
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // ---------------------------------------------------------------------------
  // Handle follow/unfollow mentor
  // ---------------------------------------------------------------------------
  const handleFollow = async (id) => {
    try {
      const res = await axios.put(
        `https://argonz-mern-project.onrender.com/api/mentors/${id}/follow`
      );
      setMentors((prev) => prev.map((m) => (m._id === id ? res.data : m)));
    } catch (err) {
      console.error("Error following mentor:", err);
    }
  };

  // ---------------------------------------------------------------------------
  // Render Component
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* --------------------------------------------------------------------- */}
      {/* Mobile top bar */}
      {/* --------------------------------------------------------------------- */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-900">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <Menu size={20} />
        </button>
        <div className="text-lg font-semibold">DNX</div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
            <Bell size={18} />
          </button>
          <img
            src="https://via.placeholder.com/40"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      <div className="flex">
        {/* ------------------------------------------------------------------- */}
        {/* Sidebar */}
        {/* ------------------------------------------------------------------- */}
        <aside
          className={`fixed z-50 inset-y-0 left-0 w-72 transform bg-white dark:bg-[#0b0b0d] border-r dark:border-gray-800 transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="h-full flex flex-col justify-between px-6 py-8">
            <div>
              <div className="text-2xl font-extrabold text-black mb-8">
                DNX
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((n) => (
                  <button
                    key={n.key}
                    onClick={() => {
                      setActiveNav(n.key);
                      setSidebarOpen(false);

                      // Navigate to routes
                      if (n.key === "overview") navigate("/dashboard");
                      if (n.key === "task") navigate("/tasks");
                      if (n.key === "mentors") navigate("/mentors");
                      if (n.key === "message") navigate("/messages");
                      if (n.key === "settings") navigate("/settings");
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full font-medium ${
                      activeNav === n.key
                        ? "bg-black text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className="w-6">{n.icon}</span>
                    <span>{n.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Help Center box */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center">
              <div className="mb-2 text-black text-3xl">?</div>
              <div className="font-semibold mb-2">Help Center</div>
              <button
                onClick={() => navigate("/help")}
                className="mt-2 w-full px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900"
              >
                Go To Help Center
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ------------------------------------------------------------------- */}
        {/* Main Content */}
        {/* ------------------------------------------------------------------- */}
        <main className="flex-1 md:ml-72">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Greeting */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">
                Hi, Dennis Nzioki
              </h1>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                Let's finish your task today!
              </p>
            </div>

            {/* Layout grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* -------------------- Left Side -------------------- */}
              <div className="col-span-2 space-y-6">
                {/* Running + Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Running Task */}
                  <div className="bg-gray-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-4">Running Task</h3>
                    <div className="relative flex items-center justify-center w-32 h-32">
                      <svg className="w-32 h-32 -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="10"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          stroke="#111111"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={2 * Math.PI * 58}
                          strokeDashoffset={(1 - 0.65) * 2 * Math.PI * 58}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="block text-2xl font-bold">65</span>
                        <span className="text-sm opacity-70">/ 100 Task</span>
                      </div>
                    </div>
                  </div>

                  {/* Activity Chart */}
                  <div className="bg-white dark:bg-[#0f1720] rounded-2xl p-5 shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Activity</h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        This Week
                      </div>
                    </div>
                    <div style={{ width: "100%", height: 120 }}>
                      <ResponsiveContainer width="100%" height={120}>
                        <LineChart data={activityData}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="tasks"
                            stroke="#111111"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Monthly Mentors */}
                <div>
                  <h3 className="font-semibold mb-3">Monthly Mentors</h3>
                  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-2 pb-3">
                    {mentors.map((m) => (
                      <div
                        key={m._id}
                        className="snap-start shrink-0 min-w-[240px] bg-white dark:bg-[#0f1720] rounded-xl p-4 shadow mx-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={m.avatar || "/default-avatar.png"}
                            alt={m.name || "Mentor"}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {m.role}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => handleFollow(m._id)}
                            className={`w-full px-3 py-2 rounded-md font-semibold ${
                              m.followed
                                ? "bg-gray-200 text-gray-800"
                                : "bg-black text-white"
                            }`}
                          >
                            {m.followed ? "Following" : "Follow"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div>
                  <h3 className="font-semibold mb-4">Upcoming Task</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingTasks.map((t) => (
                     <article
  key={t._id}
  onClick={() => navigate(`/tasks/${t._id}`)}
  className="cursor-pointer bg-white dark:bg-[#0f1720] rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
>
  <img
    src={t.image || "/default-task.png"}
    alt={t.title}
    className="w-full h-44 object-cover"
  />
  <div className="p-4">
    <h4 className="font-semibold text-lg">{t.title}</h4>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {t.category}
    </div>
  </div>
</article>

                    ))}
                  </div>
                </div>
              </div>

              {/* -------------------- Right Side -------------------- */}
              <div className="space-y-6">
                {/* Calendar */}
                <div className="bg-white dark:bg-[#0f1720] rounded-2xl p-4 shadow">
                  <Calendar
                    className="w-full rounded-lg border-0 [&_.react-calendar__tile]:rounded-lg [&_.react-calendar__tile--active]:bg-black [&_.react-calendar__tile--active]:text-white"
                  />
                </div>
                {upcomingTasks.length > 0 && (
                  <div
  onClick={() => navigate(`/tasks/${upcomingTasks[0]._id}`)}
  className="cursor-pointer bg-white dark:bg-[#0f1720] rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
>
  <img
    src={upcomingTasks[0].image || "/default-task.png"}
    alt={upcomingTasks[0].title}
    className="w-full h-36 object-cover"
  />
  <div className="p-4">
    <h4 className="font-semibold text-lg">
      {upcomingTasks[0].title}
    </h4>
  </div>
</div>

                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
