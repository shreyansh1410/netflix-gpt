const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 md:px-16 pt-16 md:pt-0">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="hidden md:block text-lg text-gray-200 mb-8 line-clamp-3">
          {overview}
        </p>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            <span className="text-2xl">▶️</span>
            Play
          </button>
          <button className="hidden md:flex items-center gap-2 bg-gray-600/80 hover:bg-gray-700/80 text-white px-8 py-3 rounded-lg font-medium backdrop-blur-sm transition-colors duration-200">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
