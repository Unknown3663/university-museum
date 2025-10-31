"use client";

import { useState } from "react";
import WorkshopForm from "../components/WorkshopForm";
import WorkshopList from "../components/WorkshopList";

export default function WorkshopsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
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

      {/* Create New Workshop Form */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Create New Workshop
        </h2>
        <WorkshopForm onSuccess={handleSuccess} />
      </div>

      {/* Workshops List */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          All Workshops
        </h2>
        <WorkshopList key={refreshKey} />
      </div>
    </div>
  );
}
