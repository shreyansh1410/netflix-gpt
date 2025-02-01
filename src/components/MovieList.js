import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const movieArray = Array.isArray(movies) ? movies : [];

  return (
    <div className="relative py-4 md:py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 px-4 md:px-8">
        {title}
      </h2>
      <div className="relative group">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4">
          {movieArray?.map((movie) => (
            <MovieCard
              key={movie?.id || Math.random()}
              posterPath={movie?.poster_path}
            />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export default MovieList;
