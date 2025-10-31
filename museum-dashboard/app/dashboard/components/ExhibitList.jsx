import Image from "next/image";

export default function ExhibitList({ exhibits, onDelete, onTogglePublish }) {
  if (exhibits.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No exhibits yet
        </h3>
        <p className="text-gray-600">
          Upload your first exhibit to get started
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exhibit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exhibits.map((exhibit) => (
              <tr key={exhibit.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {exhibit.image_url && (
                      <div className="relative h-10 w-10 flex-shrink-0 mr-4">
                        <Image
                          src={exhibit.image_url}
                          alt={exhibit.title}
                          fill
                          className="rounded object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {exhibit.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {exhibit.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exhibit.published
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {exhibit.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onTogglePublish(exhibit)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    {exhibit.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => onDelete(exhibit.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="md:hidden space-y-4">
        {exhibits.map((exhibit) => (
          <div
            key={exhibit.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              {/* Image and Title */}
              <div className="flex items-start gap-4 mb-4">
                {exhibit.image_url && (
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={exhibit.image_url}
                      alt={exhibit.title}
                      fill
                      className="rounded object-cover"
                      sizes="80px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {exhibit.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {exhibit.description}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    exhibit.published
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {exhibit.published ? "Published" : "Draft"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onTogglePublish(exhibit)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  {exhibit.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() => onDelete(exhibit.id)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
