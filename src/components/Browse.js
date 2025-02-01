import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { useSelector } from "react-redux";
import GeminiSearch from "./GeminiSearch";

const Browse = () => {
  const showAiSearch = useSelector((store) => store.aiSearch.showAiSearch);

  //using a custom hook which fetches data from TMDB api to get a clean looking browse component and adds data to the store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        {showAiSearch ? ( // Updated condition
          <GeminiSearch />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )}
      </div>
      <footer className="bg-black text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center">
            © {new Date().getFullYear()} NetflixGPT. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Browse;
