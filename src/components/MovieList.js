import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Add check for null/undefined and ensure movies is an array
  const movieArray = Array.isArray(movies) ? movies : [];

  return (
    <div className="px-6">
      <h1
        className="text-lg md:text-3xl px-2 md:py-4 text-white"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
      >
        {title}
      </h1>
      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex">
          {movieArray?.map((movie) => (
            <MovieCard
              key={movie?.id || Math.random()}
              posterPath={movie?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
