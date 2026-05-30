const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <h1 className="text-8xl font-bold text-white/10">404</h1>
      <p className="text-xl font-semibold text-white">Page Not Found</p>
      <p className="text-sm text-white/40">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-4 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition">
        ← Back to Home
      </a>
    </div>
  );
};

export default NotFound;
