"use client";

import { useState, useEffect } from "react";
import {
  createWorkshop,
  updateWorkshop,
  uploadImage,
} from "../../../lib/supabaseClient";
import type { Workshop } from "../../../../shared/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface WorkshopFormData {
  title: string;
  description: string;
  date: string;
  order: string;
  published: boolean;
  title_translations: Record<string, string>;
  description_translations: Record<string, string>;
}

interface WorkshopFormProps {
  onSuccess: () => void;
  editMode?: boolean;
  initialData?: Workshop | null;
  onCancelEdit?: () => void;
}

export default function WorkshopForm({
  onSuccess,
  editMode = false,
  initialData = null,
  onCancelEdit,
}: WorkshopFormProps) {
  const [formData, setFormData] = useState<WorkshopFormData>({
    title: "",
    description: "",
    date: "",
    order: "",
    published: false,
    title_translations: {},
    description_translations: {},
  });
  const [showTranslations, setShowTranslations] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState<boolean>(false);

  // Load initial data for edit mode
  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        date: initialData.date || "",
        order: initialData.order?.toString() || "",
        published: initialData.published || false,
        title_translations: initialData.title_translations || {},
        description_translations: initialData.description_translations || {},
      });
      // Set existing image preview if available
      if (initialData.image_url) {
        setImagePreview(initialData.image_url);
      }
    }
  }, [editMode, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTranslationChange = (
    field: "title_translations" | "description_translations",
    lang: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    // Confirm before clearing if form has data
    const hasData =
      formData.title || formData.description || formData.date || image;
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
      title_translations: {},
      description_translations: {},
    });
    setImage(null);
    setImagePreview(null);
    setError("");
    setFieldErrors({});
    setUploadProgress(0);
    // Clear file input
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.order || Number(formData.order) < 1) {
      errors.order = "Order must be a positive number";
    }

    // Image is optional for workshops - no validation needed

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      setUploadProgress(10);

      // Upload new image if selected
      setUploadProgress(30);
      let imageUrl = editMode && initialData ? initialData.image_url : null;
      if (image) {
        imageUrl = await uploadImage(image);
        setUploadProgress(70);
      }

      // Create or update workshop
      if (editMode && initialData && initialData.id) {
        await updateWorkshop(initialData.id, {
          title: formData.title,
          description: formData.description || null,
          date: formData.date,
          order: parseInt(formData.order),
          published: formData.published,
          image_url: imageUrl,
          title_translations: formData.title_translations,
          description_translations: formData.description_translations,
        });
      } else {
        await createWorkshop({
          title: formData.title,
          description: formData.description || null,
          date: formData.date,
          order: parseInt(formData.order),
          published: formData.published,
          image_url: imageUrl,
          title_translations: formData.title_translations,
          description_translations: formData.description_translations,
        });
      }

      setUploadProgress(100);

      // Show success toast
      setShowToast(true);
      if (!editMode) {
        resetForm();
      }

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
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${editMode ? "update" : "create"} workshop`,
      );
      console.error(err);
    } finally {
      setSubmitting(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4 sm:space-y-6 relative"
      >
        {/* Progress Bar */}
        {submitting && uploadProgress > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-lg overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Workshop Banner Preview
            </label>
            <div className="relative w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto object-contain max-h-64 sm:max-h-96"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview(null);
                  const fileInput = document.querySelector(
                    'input[type="file"]',
                  ) as HTMLInputElement;
                  if (fileInput) fileInput.value = "";
                }}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Image Upload Field */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Workshop Banner{" "}
            <span className="text-gray-500 text-xs">(Optional, max 5MB)</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={submitting}
            className={`w-full px-3 py-2 sm:px-4 text-sm sm:text-base border rounded-lg transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed ${
              fieldErrors.image ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          />
          {fieldErrors.image && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">
              {fieldErrors.image}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Recommended: Landscape banner image (e.g., 1200x400px)
          </p>
        </div>

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
            rows={4}
            className="w-full px-3 py-2 sm:px-4 text-sm sm:text-base border border-gray-300 rounded-lg transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 resize-none"
            placeholder="Brief description of the workshop..."
          />
        </div>

        {/* Translations Section */}
        <div className="border border-gray-300 rounded-lg p-4">
          <button
            type="button"
            onClick={() => setShowTranslations(!showTranslations)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="text-sm font-medium text-gray-700">
              🌍 Translations (Optional)
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                showTranslations ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showTranslations && (
            <div className="mt-4 space-y-4">
              <p className="text-xs text-gray-600">
                Add translations for this workshop in different languages. Leave
                blank if not available.
              </p>

              {/* Arabic */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  🇪🇬 Arabic (العربية)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title_translations["ar-EG"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "title_translations",
                          "ar-EG",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="العنوان بالعربية"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description_translations["ar-EG"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "description_translations",
                          "ar-EG",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="الوصف بالعربية"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* German */}
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  🇩🇪 German (Deutsch)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title_translations["de"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "title_translations",
                          "de",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Titel auf Deutsch"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description_translations["de"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "description_translations",
                          "de",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Beschreibung auf Deutsch"
                    />
                  </div>
                </div>
              </div>

              {/* Spanish */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  🇪🇸 Spanish (Español)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title_translations["es"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "title_translations",
                          "es",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Título en español"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description_translations["es"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "description_translations",
                          "es",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Descripción en español"
                    />
                  </div>
                </div>
              </div>

              {/* Italian */}
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  🇮🇹 Italian (Italiano)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title_translations["it"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "title_translations",
                          "it",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Titolo in italiano"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description_translations["it"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "description_translations",
                          "it",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Descrizione in italiano"
                    />
                  </div>
                </div>
              </div>

              {/* French */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  🇫🇷 French (Français)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title_translations["fr"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "title_translations",
                          "fr",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Titre en français"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description_translations["fr"] || ""}
                      onChange={(e) =>
                        handleTranslationChange(
                          "description_translations",
                          "fr",
                          e.target.value,
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description en français"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
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
            {submitting
              ? editMode
                ? "Updating..."
                : "Creating..."
              : editMode
                ? "Update Workshop"
                : "Create Workshop"}
          </button>
          {editMode ? (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={submitting}
              className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={resetForm}
              disabled={submitting}
              className="flex-1 sm:flex-none bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Clear
            </button>
          )}
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
              Workshop {editMode ? "updated" : "created"} successfully!
            </span>
          </div>
        </div>
      )}
    </>
  );
}
