import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addVideoTrailer } from '../utils/movieSlice';
import { useEffect } from 'react';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const videoTrailer = useSelector((store) => store.movies.videoTrailer);
    
    const getVideoTrailer = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/' + movieId +'/videos?language=en-US', API_OPTIONS
        );
        const json = await data.json();
        // console.log(json);
        const filterData = json.results.filter((video) => video.type==="Trailer");
        const trailer = filterData.length? filterData[0] : json.results[0]; 
        dispatch(addVideoTrailer(trailer));
    };

    useEffect(()=>{
        if(!videoTrailer) getVideoTrailer();
    },[])
}

export default useMovieTrailer;