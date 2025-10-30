"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar onMenuToggle={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <main className="lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
