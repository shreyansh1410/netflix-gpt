import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSeachBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    return (
        <div className="pt-[10%] flex justify-center">
            <form className="bg-white w-1/2 grid grid-cols-12 rounded-lg">
                <input
                    type="text"
                    className="text-black p-4 bg-white col-span-9"
                    placeholder={lang[langKey].placeholder}
                />
                <button className="py-4 mx-4 my-2 px-4 bg-red-700 text-white rounded-lg col-span-3">{lang[langKey]?.search}</button> 
            </form>
        </div>
    )
}

export default GptSeachBar;
