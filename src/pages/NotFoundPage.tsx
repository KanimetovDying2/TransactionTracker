const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page not found
      </h2>
      <p className="text-gray-500 mb-8 max-w-sm">Oops!</p>
      <a
        href="/"
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
      >
        Go back home
      </a>
    </div>
  );
};

export default NotFoundPage;
