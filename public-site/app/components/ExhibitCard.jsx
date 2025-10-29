import Image from "next/image";

export default function ExhibitCard({ exhibit }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {exhibit.image_url && (
        <div className="relative h-64 w-full">
          <Image
            src={exhibit.image_url}
            alt={exhibit.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          {exhibit.title}
        </h3>
        <p className="text-gray-600 mb-4">{exhibit.description}</p>
        {exhibit.category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {exhibit.category}
          </span>
        )}
      </div>
    </div>
  );
}
