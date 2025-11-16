"use client";

import { useState, useEffect } from "react";
import {
  getWorkshops,
  deleteWorkshop,
  toggleWorkshopPublish,
} from "../../../lib/supabaseClient";

export default function WorkshopList({ onEdit }) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const data = await getWorkshops();
      setWorkshops(data);
      setError("");
    } catch (err) {
      setError("Failed to load workshops");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();

    // Listen for workshop changes
    const handleWorkshopChange = () => fetchWorkshops();
    window.addEventListener("workshopChanged", handleWorkshopChange);

    return () => {
      window.removeEventListener("workshopChanged", handleWorkshopChange);
    };
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await deleteWorkshop(id);
      setWorkshops(workshops.filter((w) => w.id !== id));
    } catch (err) {
      alert("Failed to delete workshop");
      console.error(err);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await toggleWorkshopPublish(id, !currentStatus);
      setWorkshops(
        workshops.map((w) =>
          w.id === id ? { ...w, published: !currentStatus } : w
        )
      );
    } catch (err) {
      alert("Failed to update publish status");
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading workshops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No workshops yet
        </h3>
        <p className="mt-2 text-gray-500">
          Get started by creating your first workshop above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workshops.map((workshop) => (
              <tr
                key={workshop.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm">
                    {workshop.order}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {workshop.title}
                  </div>
                  {workshop.description && (
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {workshop.description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(workshop.date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleTogglePublish(workshop.id, workshop.published)
                    }
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      workshop.published
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {workshop.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(workshop)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(workshop.id, workshop.title)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  {workshop.order}
                </span>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {workshop.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(workshop.date)}
                  </p>
                </div>
              </div>
            </div>

            {workshop.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {workshop.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  handleTogglePublish(workshop.id, workshop.published)
                }
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  workshop.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {workshop.published ? "Published" : "Draft"}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => onEdit(workshop)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(workshop.id, workshop.title)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
