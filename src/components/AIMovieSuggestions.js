import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const AiMovieSuggestions = () => {
  const aiSearchState = useSelector((store) => store.aiSearch);

  const movieNames = aiSearchState?.movieNames;
  const movieArray = aiSearchState?.movieArray;

  if (!movieNames?.length || !movieArray?.length) 
    return null;

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
