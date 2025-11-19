export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 border-t border-gray-700 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © {currentYear}{" "}
            <span className="font-semibold text-white">Friends Of Museum</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
