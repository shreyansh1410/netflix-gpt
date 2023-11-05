import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

    //using a custom hook which fetches data from TMDB api to get a clean looking browse component and adds data to the store
    useNowPlayingMovies();
    return (
        <div>
            <Header />
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    )
}

export default Browse
