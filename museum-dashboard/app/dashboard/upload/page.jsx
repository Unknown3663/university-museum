"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadForm from "../components/UploadForm";

export default function UploadPage() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/exhibits");
    }, 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upload New Exhibit</h1>
        <p className="text-gray-600 mt-1">
          Add a new exhibit to the museum collection
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          Exhibit created successfully! Redirecting...
        </div>
      )}

      <div className="max-w-3xl">
        <UploadForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
