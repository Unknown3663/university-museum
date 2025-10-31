"use client";

import { useState } from "react";
import { createWorkshop } from "../../../lib/supabaseClient";

export default function WorkshopForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    order: "",
    published: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    // Confirm before clearing if form has data
    const hasData = formData.title || formData.description || formData.date;
    if (
      hasData &&
      !window.confirm("Are you sure you want to clear the form?")
    ) {
      return;
    }

    setFormData({
      title: "",
      description: "",
      date: "",
      order: "",
      published: false,
    });
    setError("");
    setFieldErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.order || formData.order < 1) {
      errors.order = "Order must be a positive number";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);

      // Create workshop
      await createWorkshop({
        title: formData.title,
        description: formData.description || null,
        date: formData.date,
        order: parseInt(formData.order),
        published: formData.published,
      });

      // Show success toast
      setShowToast(true);
      resetForm();

      // Dispatch custom event to update workshop list
      window.dispatchEvent(new Event("workshopChanged"));

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Trigger onSuccess callback
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create workshop");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4 sm:space-y-6"
      >
        {/* Error Message */}
        {error && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Workshop Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 sm:px-4 text-sm sm:text-base border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
              fieldErrors.title ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="e.g., Introduction to Egyptian Heritage"
          />
          {fieldErrors.title && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">
              {fieldErrors.title}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description{" "}
            <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 resize-none"
            placeholder="Brief description of the workshop..."
          />
        </div>

        {/* Date and Order Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date Field */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Workshop Date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 sm:px-4 text-sm sm:text-base border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
                fieldErrors.date
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {fieldErrors.date && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {fieldErrors.date}
              </p>
            )}
          </div>

          {/* Order Field */}
          <div>
            <label
              htmlFor="order"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Order <span className="text-red-500">*</span>
            </label>
            <input
              id="order"
              type="number"
              name="order"
              min="1"
              value={formData.order}
              onChange={handleChange}
              className={`w-full px-3 py-2 sm:px-4 text-sm sm:text-base border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
                fieldErrors.order
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="1"
            />
            {fieldErrors.order && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                {fieldErrors.order}
              </p>
            )}
          </div>
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <input
            id="published"
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
          <label
            htmlFor="published"
            className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer"
          >
            Publish immediately
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {submitting ? "Creating..." : "Create Workshop"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            disabled={submitting}
            className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg animate-slide-in-right z-50">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-sm sm:text-base">
              Workshop created successfully!
            </span>
          </div>
        </div>
      )}
    </>
  );
}
