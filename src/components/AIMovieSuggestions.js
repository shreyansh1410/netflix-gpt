import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const AiMovieSuggestions = () => {
  // Updated selector to use aiSearch instead of gpt
  const aiSearchState = useSelector((store) => store.aiSearch);

  // Safely access the properties with null checking
  const movieNames = aiSearchState?.movieNames;
  const movieArray = aiSearchState?.movieArray;

  // If we don't have movie names or the array, return null
  if (!movieNames || !movieArray) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-70">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieArray[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default AiMovieSuggestions;
