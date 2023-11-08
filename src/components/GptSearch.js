import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSeachBar from "./GptSeachBar"
import { BACKGROUND_IMG_URL } from './../utils/constants';

const GptSearch = () => {
    return (
        <div>
            <div className="absolute -z-10">
                <img src={BACKGROUND_IMG_URL} alt="backgroundImage " className="brightness-75" />
            </div>
            <GptSeachBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch
