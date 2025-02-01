import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
// import useNowPlayingMovies from './../hooks/useNowPlayingMovies';
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
