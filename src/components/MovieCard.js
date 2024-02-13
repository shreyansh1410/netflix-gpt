import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
    const user = useSelector((store) => store.user);
    consol
    if(!posterPath) return null;
    return (
        <div className="w-36 md:w-48 my-6 mx-2">
            <img alt="Movie card" src={IMG_CDN_URL+posterPath}></img>
        </div>
    )
}




export default MovieCard;
