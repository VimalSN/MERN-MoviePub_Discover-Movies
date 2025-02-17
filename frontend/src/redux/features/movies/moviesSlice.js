import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: [],
    },

    filteredMovies: [],
    movieYears: [],
    uniqueYear: [],
  },

  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },

    // action.payload represents the new values that you want to update in state.moviesFilter. 
    // When setMoviesFilter is dispatched, you pass an object to payload with the properties you want to modify or add. 
    // The reducer then merges these new values into the existing state using the spread operator (...).

    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },

    setMovieYears: (state, action) => {
      state.movieYears = action.payload;
    },

    setUniqueYears: (state, action) => {
      state.uniqueYear = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} = moviesSlice.actions;

export default moviesSlice.reducer;




// In Redux, when you dispatch an action, it usually contains a type (to identify the action) and an optional payload 
// (which contains the data or information that is being sent along with the action).

// What is action.payload?
// action.payload refers to the data that is passed along with the action when it is dispatched. It carries the values 
// that need to be used to update the state in the reducer.

// In the case of your setMoviesFilter reducer, action.payload would be the object containing the specific changes you 
// want to make to state.moviesFilter.
