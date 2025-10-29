// Enhanced UploadForm component with image preview, category dropdown, progress bar, and success toast
"use client";

import { useState } from "react";
import { createExhibit, uploadImage } from "../../../lib/supabaseClient";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const CATEGORIES = [
  "Art",
  "Archaeology",
  "History",
  "Nature",
  "Culture",
  "Other",
];

export default function UploadForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    customCategory: "",
    published: false,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

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

  const handleImageChange = (e) => {
    setError("");
    setFieldErrors((prev) => ({ ...prev, image: "" }));

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (5MB limit)
      if (file.size > MAX_FILE_SIZE) {
        const errorMsg = `Image size must be less than 5MB. Your file is ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB.`;
        setError(errorMsg);
        setFieldErrors((prev) => ({ ...prev, image: errorMsg }));
        e.target.value = ""; // Clear the input
        setImage(null);
        setImagePreview(null);
        return;
      }

      setImage(file);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    // Confirm before clearing if form has data
    const hasData =
      formData.title || formData.description || formData.category || image;
    if (
      hasData &&
      !window.confirm("Are you sure you want to clear the form?")
    ) {
      return;
    }

    setFormData({
      title: "",
      description: "",
      category: "",
      customCategory: "",
      published: false,
    });
    setImage(null);
    setImagePreview(null);
    setError("");
    setFieldErrors({});
    setUploadProgress(0);
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!image) {
      errors.image = "Please select an image";
    }

    if (formData.category === "Other" && !formData.customCategory.trim()) {
      errors.customCategory = "Please specify a custom category";
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
      setUploading(true);
      setUploadProgress(10);

      // Upload image
      setUploadProgress(30);
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
        setUploadProgress(70);
      }

      // Get final category value
      const finalCategory =
        formData.category === "Other"
          ? formData.customCategory
          : formData.category;

      // Create exhibit
      await createExhibit({
        title: formData.title,
        description: formData.description,
        category: finalCategory,
        published: formData.published,
        image_url: imageUrl,
      });

      setUploadProgress(100);

      // Show success toast
      setShowToast(true);
      resetForm();

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      // Trigger onSuccess callback after a brief delay
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to create exhibit");
      console.error(err);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6 relative"
      >
        {/* Progress Bar */}
        {uploading && uploadProgress > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-lg overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image Preview
            </label>
            <div className="relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                  const fileInput =
                    document.querySelector('input[type="file"]');
                  if (fileInput) fileInput.value = "";
                }}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            aria-required="true"
            className={`w-full px-4 py-2 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
              fieldErrors.title ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter exhibit title"
          />
          {fieldErrors.title && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            aria-required="true"
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
              fieldErrors.description
                ? "border-red-500 bg-red-50"
                : "border-gray-300"
            }`}
            placeholder="Enter exhibit description"
          />
          {fieldErrors.description && (
            <p className="text-red-600 text-sm mt-1">
              {fieldErrors.description}
            </p>
          )}
        </div>

        {/* Category Dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 bg-white"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Category Field (shown when "Other" is selected) */}
        {formData.category === "Other" && (
          <div className="animate-fade-in">
            <label
              htmlFor="customCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Custom Category <span className="text-red-500">*</span>
            </label>
            <input
              id="customCategory"
              type="text"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
                fieldErrors.customCategory
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              placeholder="Enter custom category"
            />
            {fieldErrors.customCategory && (
              <p className="text-red-600 text-sm mt-1">
                {fieldErrors.customCategory}
              </p>
            )}
          </div>
        )}

        {/* Image Upload Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image <span className="text-red-500">*</span>{" "}
            <span className="text-gray-500 text-xs">(Max 5MB)</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            aria-label="Upload exhibit image"
            className={`w-full px-4 py-2 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 ${
              fieldErrors.image ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {fieldErrors.image && (
            <p className="text-red-600 text-sm mt-1">{fieldErrors.image}</p>
          )}
          {image && !fieldErrors.image && (
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Selected: {image.name} ({(image.size / 1024).toFixed(0)}KB)
            </p>
          )}
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            aria-label="Publish exhibit immediately"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
          />
          <label
            htmlFor="published"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            Publish immediately
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={uploading}
            aria-busy={uploading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md flex items-center justify-center gap-2"
          >
            {uploading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {uploading ? "Creating..." : "Create Exhibit"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={uploading}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in z-50">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">✅ Exhibit uploaded successfully!</span>
        </div>
      )}
    </>
  );
}
