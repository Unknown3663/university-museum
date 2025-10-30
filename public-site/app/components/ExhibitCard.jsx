import Image from "next/image";

export default function ExhibitCard({ exhibit, index = 0, priority = false }) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
      {exhibit.image_url && (
        <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
          <Image
            src={exhibit.image_url}
            alt={exhibit.title}
            fill
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2 line-clamp-2">
          {exhibit.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-1">
          {exhibit.description}
        </p>
        {exhibit.category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full self-start">
            {exhibit.category}
          </span>
        )}
      </div>
    </div>
  );
}
