import { useState } from "react";
import { useDispatch } from "react-redux";
import model from "../utils/gemini";
import { addAiMovieResults } from "../utils/aiSearchSlice";
import { API_OPTIONS } from "../utils/constants";

const GeminiSearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      if (!movie || typeof movie !== "string") {
        console.warn("Invalid movie name:", movie);
        return [];
      }

      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          encodeURIComponent(movie.trim()) +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );

      if (!data.ok) {
        throw new Error(`TMDB API Error: ${data.status}`);
      }

      const json = await data.json();
      return json.results && json.results.length > 0 ? [json.results[0]] : [];
    } catch (error) {
      console.error("TMDB search error for movie:", movie, error);
      return [];
    }
  };

  const parseGeminiResponse = (response) => {
    if (!response) return [];

    // First, clean up the response
    const cleanResponse = response
      .replace(/^[^A-Za-z]*/, "") // Remove leading non-alphabetic characters
      .replace(/[^A-Za-z\s,]*$/, ""); // Remove trailing non-alphabetic characters

    // Split by both newlines and commas
    const movieNames = cleanResponse
      .split(/[\n,]/) // Split by either newline or comma
      .map((movie) => movie.trim())
      .filter((movie) => movie.length > 0);

    console.log("Cleaned movie names:", movieNames); // Debug log
    return movieNames;
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Updated prompt to explicitly request comma-separated format
      const prompt = `Act as a movie recommendation system for the query: ${searchText}. Give me exactly 5 movie names in a comma-separated format only. Example format: Don, Gadar, Koi Mil Gaya, Hera Pheri, OMG. Don't add any extra text or line breaks.`;

      const result = await model.generateContent(prompt);

      if (!result || !result.response) {
        throw new Error("No response from Gemini API");
      }

      const response = result.response.text();
      console.log("Raw Gemini response:", response);

      const movieNames = parseGeminiResponse(response);
      console.log("Parsed movie names:", movieNames);

      if (movieNames.length === 0) {
        throw new Error("No valid movie names found in response");
      }

      const tmdbResultsPromises = movieNames.map((name) =>
        searchMovieTMDB(name)
      );
      const tmdbResults = await Promise.all(tmdbResultsPromises);

      console.log("TMDB Results:", tmdbResults);

      // Filter out empty results and ensure we have valid data
      const validResults = tmdbResults.filter(
        (result) =>
          Array.isArray(result) && result.length > 0 && result[0]?.poster_path
      );

      if (validResults.length === 0) {
        throw new Error(
          "No movie posters found for the given recommendations."
        );
      }

      // Update the Redux store
      dispatch(
        addAiMovieResults({
          movieNames: movieNames.slice(0, validResults.length),
          movieArray: validResults,
        })
      );
    } catch (error) {
      console.error("Search error:", error);
      setError(
        error.message ||
          "Sorry, could not process that request. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex flex-col items-center">
      <input
        type="text"
        className="p-4 m-4 w-1/2 rounded-lg bg-gray-900 text-white"
        placeholder="What would you like to watch?"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        disabled={isLoading}
      />
      <button
        className={`py-2 px-4 bg-red-700 text-white rounded-lg ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
      {error && (
        <p className="text-red-500 mt-2 bg-black bg-opacity-75 p-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
};

export default GeminiSearchBar;
