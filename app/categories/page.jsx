import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Categories - University Museum',
  description: 'Browse our museum collections by category.',
}

export default function Categories() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-6">
            Categories
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <p className="text-lg text-gray-700">
              This is a placeholder for the Categories page. Here you can display different collection categories.
            </p>
            <p className="text-gray-600">
              Content coming soon...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-semibold mb-2">Art & Paintings</h3>
                <p className="text-gray-600">Coming soon</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-semibold mb-2">Archaeology</h3>
                <p className="text-gray-600">Coming soon</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-semibold mb-2">Historical Artifacts</h3>
                <p className="text-gray-600">Coming soon</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-semibold mb-2">Natural History</h3>
                <p className="text-gray-600">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
