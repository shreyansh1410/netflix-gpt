import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState:{
        showGptSearch: false,
        movieNames: null,
        movieArray: null,
    },
    reducers:{
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResults: (state , action) => {
            const {movieNames, movieArray} = action.payload;
            state.movieNames = movieNames;
            state.movieArray = movieArray;
        }
    },
});

export const {toggleGptSearchView , addGptMovieResults} = gptSlice.actions; 

export default gptSlice.reducer;