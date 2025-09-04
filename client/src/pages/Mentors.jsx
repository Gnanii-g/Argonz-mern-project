import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Bell, Star, Users, Plus, Menu } from "lucide-react";
import AddMentor from "./AddMentor";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    const res = await axios.get("https://argonz-mern-project.onrender.com/api/mentors");
    setMentors(res.data);
  };

  const toggleFollow = async (id) => {
    const res = await axios.put(`https://argonz-mern-project.onrender.com/api/mentors/${id}/follow`);
    setMentors((prev) =>
      prev.map((m) => (m._id === id ? res.data : m))
    );
  };

  // Sidebar/Topbar nav links
  const navLinks = (
    <>
      <a className="flex items-center p-2 rounded-md hover:bg-gray-100 md:hover:bg-gray-100" href="/">
        <span className="ml-2">Overview</span>
      </a>
      <a className="flex items-center p-2 rounded-md hover:bg-gray-100 md:hover:bg-gray-100" href="/tasks">
        <span className="ml-2">Task</span>
      </a>
      <a className="flex items-center p-2 rounded-md bg-gray-900 text-white md:bg-gray-900 md:text-white" href="/mentors">
        <span className="ml-2">Mentors</span>
      </a>
      <a className="flex items-center p-2 rounded-md hover:bg-gray-100 md:hover:bg-gray-100" href="/messages">
        <span className="ml-2">Message</span>
      </a>
      <a className="flex items-center p-2 rounded-md hover:bg-gray-100 md:hover:bg-gray-100" href="/settings">
        <span className="ml-2">Settings</span>
      </a>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg fixed inset-y-0">
        <div className="p-6 font-bold text-xl">DNX</div>
        <nav className="space-y-2 px-4">{navLinks}</nav>
        <div className="absolute bottom-4 left-4 right-4 bg-black text-white rounded-xl p-4">
          <div className="font-semibold mb-2">Help Center</div>
          <p className="text-sm opacity-80 mb-3">Having trouble in learning? Contact us.</p>
          <button className="w-full bg-white text-black rounded-md py-2">Go To Help Center</button>
        </div>
      </aside>

      {/* Topbar menu for mobile */}
      <header className="md:hidden bg-white shadow-lg w-full flex items-center justify-between px-4 py-3 sticky top-0 z-30">
        <div className="font-bold text-xl">DNX</div>
        <button
          className="p-2 rounded-md focus:outline-none"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <Menu size={24} />
        </button>
      </header>
      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setMobileMenuOpen(false)}>
          <nav
            className="absolute top-0 left-0 w-3/4 max-w-xs bg-white h-full shadow-lg flex flex-col space-y-2 px-4 py-6"
            onClick={e => e.stopPropagation()}
          >
            {navLinks}
            <div className="mt-auto bg-black text-white rounded-xl p-4">
              <div className="font-semibold mb-2">Help Center</div>
              <p className="text-sm opacity-80 mb-3">Having trouble in learning? Contact us.</p>
              <button className="w-full bg-white text-black rounded-md py-2">Go To Help Center</button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 mt-16 md:mt-0">
        {/* Topbar (desktop only) */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Explore Mentors</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Mentors"
                className="outline-none text-sm bg-transparent"
              />
            </div>
            <button className="flex items-center border rounded-lg px-3 py-2 text-sm">
              Category
            </button>
            <button className="flex items-center border rounded-lg px-3 py-2 text-sm">
              Sort By: Popular
            </button>
            <Bell className="w-5 h-5 text-gray-600" />
            <button
              onClick={() => setShowAddForm(true)}
              className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              title="Add Mentor"
            >
              <Plus size={18} />
            </button>
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              className="w-8 h-8 rounded-full"
              alt="profile"
            />
          </div>
        </div>
        {/* Topbar (mobile only) */}
        <div className="md:hidden flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Explore Mentors</h1>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <button
                onClick={() => setShowAddForm(true)}
                className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                title="Add Mentor"
              >
                <Plus size={18} />
              </button>
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-8 h-8 rounded-full"
                alt="profile"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Mentors"
                className="outline-none text-sm bg-transparent w-full"
              />
            </div>
            <button className="flex items-center border rounded-lg px-3 py-2 text-sm">
              Category
            </button>
            <button className="flex items-center border rounded-lg px-3 py-2 text-sm">
              Sort
            </button>
          </div>
        </div>

        {/* Recent Mentors */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Recent Mentors</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {mentors.slice(0, 4).map((mentor) => (
              <div
                key={mentor._id}
                className="bg-white rounded-xl p-4 shadow-sm w-64 flex-shrink-0"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={mentor.avatar || "https://via.placeholder.com/50"}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{mentor.name}</h3>
                    <p className="text-sm text-gray-500">{mentor.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" /> <span>{mentor.tasks} Task</span>
                  </div>
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    {mentor.rating} ({mentor.reviews})
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(mentor._id)}
                  className={`mt-3 text-sm font-medium ${
                    mentor.followed
                      ? "text-gray-500"
                      : "text-indigo-600 hover:underline"
                  }`}
                >
                  {mentor.followed ? "Followed" : "+ Follow"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Mentors Grid */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor._id} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={mentor.avatar || "https://via.placeholder.com/60"}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{mentor.name}</h3>
                    <p className="text-sm text-gray-500">{mentor.role}</p>
                  </div>
                  <button
                    onClick={() => toggleFollow(mentor._id)}
                    className={`ml-auto text-sm font-medium ${
                      mentor.followed
                        ? "text-gray-500"
                        : "text-indigo-600 hover:underline"
                    }`}
                  >
                    {mentor.followed ? "Followed" : "+ Follow"}
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                  {mentor.bio || "Hi, I'm a mentor..."}
                </p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" /> <span>{mentor.tasks} Task</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 mr-1" />
                    {mentor.rating} ({mentor.reviews})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Add Mentor Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 relative w-[90vw] max-w-[400px]">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <AddMentor />
          </div>
        </div>
      )}
    </div>
  );
}
