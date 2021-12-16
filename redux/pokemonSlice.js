import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    favorite: [],
  },
  reducers: {
    ADD_FAVORITE: (state, action) => {
      state.favorite = [...state.favorite, action.payload];
    },
    DELETE_FAVORITE: (state, action) => {
      let result = state.favorite.filter((favorite) => favorite.name != action.payload.name);
      state.favorite = result;
    },
  },
});

export const { ADD_FAVORITE, DELETE_FAVORITE } = pokemonSlice.actions;

// selector
export const selectfavorite = state => state.pokemon.favorite;

export default pokemonSlice.reducer;
