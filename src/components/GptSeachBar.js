import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSeachBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    //search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", 
            API_OPTIONS
        );
        const json = await data.json();
        return json.results;
    }
    const handleGptSearchClick = async () => {
        // console.log(searchText.current.value);
        //make api call to openai to get movie results
        const gptQuery = "Act as a movie recommendation system for the query : " + 
                        searchText.current.value + ".Only give me names of 5 movies in the specified example format given ahead. Example format: Don, Gadar, Koi Mil Gaya, Hera Pheri, OMG."
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });

        if(!gptResults.choices){
            //error handling
        }

        console.log(gptResults.choices?.[0]?.message?.content);

        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);
        dispatch(
            addGptMovieResults({movieNames: gptMovies , movieArray : tmdbResults})
        );
    }
    return (
        <div className="pt-[10%] flex justify-center">
            <form className="bg-white w-1/2 grid grid-cols-12 rounded-lg"
                onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="text-black p-4 bg-white col-span-9"
                    placeholder={lang[langKey].placeholder}
                />
                <button className="py-4 mx-4 my-2 px-4 bg-red-700 text-white rounded-lg col-span-3"
                    onClick={handleGptSearchClick}>
                    {lang[langKey]?.search}
                </button>
            </form>
        </div>
    )
}

export default GptSeachBar;
