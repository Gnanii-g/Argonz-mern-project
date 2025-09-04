import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'
import AddTask from './pages/AddTask'
import Mentors from './pages/Mentors'
import AddMentor from "./pages/AddMentor"; 
import Tasks from "./pages/Tasks";
import './index.css'; // your Tailwind CSS file

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
         <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/tasks/new" element={<AddTask />} />

        <Route path="/mentors" element={<Mentors />} />
        <Route path="/add-mentor" element={<AddMentor />} />
      </Routes>
    </div>
  )
}

export default App
