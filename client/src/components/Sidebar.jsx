// src/components/Sidebar.jsx
import React from "react";
import {
    Home,
    ListTodo,
    Users,
    MessageCircle,
    Settings,
    HelpCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
    { key: "overview", label: "Overview", icon: <Home className="w-5 h-5" />, path: "/" },
    { key: "task", label: "Tasks", icon: <ListTodo className="w-5 h-5" />, path: "/tasks" },
    { key: "mentors", label: "Mentors", icon: <Users className="w-5 h-5" />, path: "/mentors" },
    { key: "message", label: "Message", icon: <MessageCircle className="w-5 h-5" />, path: "/messages" },
    { key: "settings", label: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={`fixed top-0 left-0 h-screen w-64 bg-black dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between transition-transform z-20
            ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
        >
            <div>
                <div className="p-6 text-2xl font-bold text-black dark:text-white">DNX</div>
                <nav className="flex-1 px-3 space-y-2">
                    {navItems.map((n) => (
                        <button
                            key={n.key}
                            onClick={() => {
                                navigate(n.path);
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left font-medium ${
                                location.pathname === n.path
                                    ? "bg-black text-white"
                                    : "text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800"
                            }`}
                        >
                            <span className="w-6">{n.icon}</span>
                            <span>{n.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Help Center */}
            <div className="p-4">
                <div className="bg-gray-900 text-white rounded-xl p-4 text-center">
                    <HelpCircle className="w-6 h-6 mx-auto mb-2" />
                    <h3 className="font-semibold">Help Center</h3>
                    <p className="text-sm text-gray-400">Having trouble?</p>
                    <button className="mt-2 px-3 py-1 bg-black rounded-lg text-sm text-white">
                        Go To Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
