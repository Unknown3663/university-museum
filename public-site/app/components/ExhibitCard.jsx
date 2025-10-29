import Image from "next/image";

export default function ExhibitCard({ exhibit, index = 0, priority = false }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
      {exhibit.image_url && (
        <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
          <Image
            src={exhibit.image_url}
            alt={exhibit.title}
            fill
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          {exhibit.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{exhibit.description}</p>
        {exhibit.category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {exhibit.category}
          </span>
        )}
      </div>
    </div>
  );
}
