interface CollectionSkeletonProps {
  cardCount?: number;
  showHeader?: boolean;
  showSearch?: boolean;
  titleWidthClassName?: string;
}

export default function CollectionSkeleton({
  cardCount = 6,
  showHeader = true,
  showSearch = false,
  titleWidthClassName = "w-64 sm:w-80",
}: CollectionSkeletonProps) {
  return (
    <div className="max-w-7xl mx-auto pb-12 sm:pb-16" aria-hidden="true">
      {showHeader && (
        <div className="mb-10 rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:mb-12 sm:rounded-2xl sm:p-8 md:mb-16">
          <div
            className={`surface-skeleton mx-auto mb-4 h-12 ${titleWidthClassName}`}
          />
          <div className="surface-skeleton mx-auto h-5 w-full max-w-3xl sm:h-6" />
        </div>
      )}

      {showSearch && (
        <div className="mb-6 sm:mb-8">
          <div className="surface-skeleton mx-auto h-12 max-w-2xl rounded-full" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {Array.from({ length: cardCount }).map((_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md"
          >
            <div className="surface-skeleton aspect-video w-full rounded-none" />
            <div className="space-y-4 p-6">
              <div className="surface-skeleton h-7 w-3/4" />
              <div className="surface-skeleton h-4 w-full" />
              <div className="surface-skeleton h-4 w-5/6" />
              <div className="surface-skeleton h-4 w-2/3" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
