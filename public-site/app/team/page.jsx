import Navbar from "../components/Navbar";

export const metadata = {
  title: "Our Team - Tourist Guidance Museum",
  description: "Meet the dedicated team behind the Tourist Guidance Museum.",
};

export default function Team() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Team
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <p className="text-lg text-gray-700">
              This is a placeholder for the Team page. Here you can showcase the
              members of your museum team.
            </p>
            <p className="text-gray-600">Content coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
