const Loader = () => {
  return (
    <div
      className="animate-spin inline-block w-10 h-10 border-[3px] border-pink border-t-transparent text-pink-600 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
