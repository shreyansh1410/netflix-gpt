import { createSlice } from "@reduxjs/toolkit";

const aiSearchSlice = createSlice({
  name: "aiSearch",
  initialState: {
    showAiSearch: false,
    movieNames: [],
    movieArray: [],
  },
  reducers: {
    toggleAiSearchView: (state) => {
      state.showAiSearch = !state.showAiSearch;
    },
    addAiMovieResults: (state, action) => {
      const { movieNames, movieArray } = action.payload;
      // Ensure we're always storing arrays
      state.movieNames = Array.isArray(movieNames) ? movieNames : [];
      state.movieArray = Array.isArray(movieArray) ? movieArray : [];
    },
    clearAiMovieResults: (state) => {
      state.movieNames = [];
      state.movieArray = [];
    },
  },
});

export const { toggleAiSearchView, addAiMovieResults, clearAiMovieResults } =
  aiSearchSlice.actions;

export default aiSearchSlice.reducer;
