import AiMovieSuggestions from "./AIMovieSuggestions"; // Updated import
import GeminiSearchBar from "./GeminiSearchBar";
import { BACKGROUND_IMG_URL } from "../utils/constants";

const GeminiSearch = () => {
  return (
    <div>
      <div className="fixed -z-10 w-full">
        <img
          src={BACKGROUND_IMG_URL}
          alt="backgroundImage"
          className="brightness-50 object-cover h-screen w-full"
        />
      </div>
      <div>
        <GeminiSearchBar />
        <AiMovieSuggestions />
      </div>
    </div>
  );
};

export default GeminiSearch;
