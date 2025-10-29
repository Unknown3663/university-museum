"use client";

import { useState, useEffect } from "react";
import { getExhibits, deleteExhibit } from "../../../lib/supabaseClient";
import ExhibitList from "../components/ExhibitList";

export default function ExhibitsPage() {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadExhibits();
  }, []);

  const loadExhibits = async () => {
    try {
      setLoading(true);
      const data = await getExhibits();
      setExhibits(data || []);
    } catch (err) {
      setError("Failed to load exhibits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this exhibit?")) return;

    try {
      await deleteExhibit(id);
      await loadExhibits();
    } catch (err) {
      alert("Failed to delete exhibit");
      console.error(err);
    }
  };

  const handleTogglePublish = async (exhibit) => {
    // Import here to avoid circular dependency
    const { updateExhibit } = await import("../../../lib/supabaseClient");
    try {
      await updateExhibit(exhibit.id, { published: !exhibit.published });
      await loadExhibits();
    } catch (err) {
      alert("Failed to update exhibit");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exhibits...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Exhibits</h1>
        <p className="text-gray-600 mt-1">Edit, delete, and publish exhibits</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <ExhibitList
        exhibits={exhibits}
        onDelete={handleDelete}
        onTogglePublish={handleTogglePublish}
      />
    </div>
  );
}
