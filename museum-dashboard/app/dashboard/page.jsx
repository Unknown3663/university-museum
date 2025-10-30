"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();

    // Listen for custom event when a new exhibit is created
    const handleExhibitChange = () => {
      fetchStats();
    };

    window.addEventListener("exhibitChanged", handleExhibitChange);

    return () => {
      window.removeEventListener("exhibitChanged", handleExhibitChange);
    };
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch all exhibits
      const { data: allExhibits, error: allError } = await supabase
        .from("exhibits")
        .select("id, published");

      if (allError) throw allError;

      const total = allExhibits?.length || 0;
      const published = allExhibits?.filter((ex) => ex.published).length || 0;
      const drafts = total - published;

      setStats({ total, published, drafts });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
        Dashboard Overview
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
        Welcome to the Museum Dashboard. Use the sidebar to navigate.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Exhibits
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
                {loading ? "—" : stats.total}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl">🖼️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Published
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
                {loading ? "—" : stats.published}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Drafts
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-600 mt-1 sm:mt-2">
                {loading ? "—" : stats.drafts}
              </p>
            </div>
            <div className="text-3xl sm:text-4xl">📝</div>
          </div>
        </div>
      </div>
    </div>
  );
}
