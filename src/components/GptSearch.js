import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSeachBar from "./GptSeachBar";
import { BACKGROUND_IMG_URL } from "./../utils/constants";

const GptSearch = () => {
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
        <GptSeachBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
