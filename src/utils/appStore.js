import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import aiSearchReducer from "./aiSearchSlice"; // Updated import
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    aiSearch: aiSearchReducer, // Updated reducer name
    config: configReducer,
  },
});

export default appStore;
