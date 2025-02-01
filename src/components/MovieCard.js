import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="relative group transition-transform duration-300 hover:scale-105">
      <div className="w-36 md:w-48 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 group-hover:shadow-red-500/30">
        <img
          alt="Movie poster"
          src={IMG_CDN_URL + posterPath}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default MovieCard;
