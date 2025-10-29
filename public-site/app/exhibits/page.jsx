"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ExhibitCard from "../components/ExhibitCard";
import { getPublishedExhibits } from "../lib/supabaseClient";

export default function Exhibits() {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExhibits() {
      try {
        const data = await getPublishedExhibits();
        setExhibits(data);
      } catch (error) {
        console.error("Error fetching exhibits:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExhibits();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Our Exhibits
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of exhibits from around the world
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
            </div>
          ) : exhibits.length === 0 ? (
            <div className="text-center bg-white rounded-lg shadow-lg p-12">
              <p className="text-xl text-gray-600">
                No exhibits available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exhibits.map((exhibit) => (
                <ExhibitCard key={exhibit.id} exhibit={exhibit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
