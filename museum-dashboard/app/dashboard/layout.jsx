import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Sidebar />
        <main className="ml-64 pt-20 px-8 py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
