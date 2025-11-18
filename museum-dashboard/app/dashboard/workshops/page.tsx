"use client";

import { useState, useEffect } from "react";
import WorkshopForm from "../components/WorkshopForm";
import WorkshopList from "../components/WorkshopList";
import type { Workshop } from "../../../../shared/types";

export default function WorkshopsPage() {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [editWorkshop, setEditWorkshop] = useState<Workshop | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're returning from another page with edit data
    const storedWorkshop = sessionStorage.getItem("editWorkshop");
    if (storedWorkshop) {
      const workshop = JSON.parse(storedWorkshop);
      setEditWorkshop(workshop);
      setIsEditMode(true);
      // Clear from sessionStorage
      sessionStorage.removeItem("editWorkshop");
    }
  }, []);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setIsEditMode(false);
    setEditWorkshop(null);
  };

  const handleEdit = (workshop: Workshop): void => {
    setEditWorkshop(workshop);
    setIsEditMode(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditWorkshop(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Workshop Management
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Create and manage heritage awareness workshops
        </p>
      </div>

      {/* Create/Edit Workshop Form */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          {isEditMode ? "Edit Workshop" : "Create New Workshop"}
        </h2>
        <WorkshopForm
          onSuccess={handleSuccess}
          editMode={isEditMode}
          initialData={editWorkshop}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* Workshops List */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          All Workshops
        </h2>
        <WorkshopList key={refreshKey} onEdit={handleEdit} />
      </div>
    </div>
  );
}
