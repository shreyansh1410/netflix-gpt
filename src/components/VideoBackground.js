import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId);
  const videoTrailer = useSelector((store) => store.movies?.videoTrailer);

  return (
    <div className="relative w-full aspect-video bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <iframe
        className="w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoTrailer?.key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoTrailer?.key}&modestbranding=1`}
        title="Movie trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default VideoBackground;
