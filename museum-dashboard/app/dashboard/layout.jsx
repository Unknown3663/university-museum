import DashboardNavbar from "../components/DashboardNavbar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
