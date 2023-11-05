import React from 'react'
import useMovieTrailer from '../hooks/useMovieTrailer'
import { useSelector } from 'react-redux';

const VideoBackground = ({movieId}) => {
    useMovieTrailer(movieId);
    const videoTrailer = useSelector((store) => store.movies?.videoTrailer);
    return (
        <div className='w-screen'>
            <iframe
                className='w-screen aspect-video'
                src={"https://www.youtube-nocookie.com/embed/"+videoTrailer?.key+"?autoplay=1&mute=1&loop=1&amp;controls=0&playlist="+videoTrailer?.key}
                title="YouTube video player"
                allow="accelerometer; autoplay; modestbranding; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            ></iframe>
        </div>
    )
}

export default VideoBackground
