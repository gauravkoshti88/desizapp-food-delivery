// InternalServerError.jsx
export default function InternalServerError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-xl p-10 border-2 border-red-400">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-16 h-16 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-700 text-center">
          500 - Internal Server Error
        </h1>
        <p className="mt-4 text-center text-red-600 text-lg">
          Oops! Something went wrong on our end. Please try again later.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/home"
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-lg"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}