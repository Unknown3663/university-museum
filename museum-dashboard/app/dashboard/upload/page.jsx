"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "../components/UploadForm";

export default function UploadPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [editExhibit, setEditExhibit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check if we're in edit mode
    const storedExhibit = sessionStorage.getItem("editExhibit");
    if (storedExhibit) {
      const exhibit = JSON.parse(storedExhibit);
      setEditExhibit(exhibit);
      setIsEditMode(true);
      // Clear from sessionStorage
      sessionStorage.removeItem("editExhibit");
    }
  }, []);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/exhibits");
    }, 2000);
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {isEditMode ? "Edit Exhibit" : "Upload New Exhibit"}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          {isEditMode
            ? "Update the exhibit information"
            : "Add a new exhibit to the museum collection"}
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
          {isEditMode ? "Exhibit updated" : "Exhibit created"} successfully!
          Redirecting...
        </div>
      )}

      <div className="max-w-full lg:max-w-3xl">
        <UploadForm
          onSuccess={handleSuccess}
          editMode={isEditMode}
          initialData={editExhibit}
        />
      </div>
    </div>
  );
}
