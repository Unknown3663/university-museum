"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getExhibits, deleteExhibit } from "../../../lib/supabaseClient";
import ExhibitList from "../components/ExhibitList";
import type { Exhibit } from "../../../../shared/types";

export default function ExhibitsPage() {
  const router = useRouter();
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this exhibit?")) return;

    try {
      await deleteExhibit(id);
      await loadExhibits();
      // Notify dashboard to update stats
      window.dispatchEvent(new Event("exhibitChanged"));
    } catch (err) {
      alert("Failed to delete exhibit");
      console.error(err);
    }
  };

  const handleTogglePublish = async (id: string): Promise<void> => {
    // Import here to avoid circular dependency
    const { updateExhibit, getExhibits } = await import(
      "../../../lib/supabaseClient"
    );
    try {
      const allExhibits = await getExhibits();
      const exhibit = allExhibits.find((e) => e.id === id);
      if (exhibit && exhibit.id) {
        await updateExhibit(exhibit.id, { published: !exhibit.published });
        await loadExhibits();
        // Notify dashboard to update stats
        window.dispatchEvent(new Event("exhibitChanged"));
      }
    } catch (err) {
      alert("Failed to update exhibit");
      console.error(err);
    }
  };

  const handleEdit = (exhibit: Exhibit): void => {
    // Store the exhibit data in sessionStorage to be used by the upload page
    sessionStorage.setItem("editExhibit", JSON.stringify(exhibit));
    router.push("/dashboard/upload");
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Manage Exhibits
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Edit, delete, and publish exhibits
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
          {error}
        </div>
      )}

      <ExhibitList
        exhibits={exhibits}
        onDelete={handleDelete}
        onTogglePublish={handleTogglePublish}
        onEdit={handleEdit}
      />
    </div>
  );
}
