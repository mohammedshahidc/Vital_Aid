export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 sm:p-20 gap-16 font-sans">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to Vitail Aid</h1>
        <p className="text-lg text-gray-500 mt-2">Your ultimate project management solution</p>
      </header>

      <main className="text-center">
        <p className="text-xl text-gray-700">
          Collaborate, organize, and achieve your goals efficiently with Vitail Aid.  
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            Get Started
          </button>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Vitail Aid. All rights reserved.
      </footer>
    </div>
  );
}
