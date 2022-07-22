import { createSlice } from "@reduxjs/toolkit";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    favorite: [],
    pokemonData: [],
    displayedPokemons: [],
    isShowLoadMore: true,
  },
  reducers: {
    ADD_FAVORITE: (state, action) => {
      state.favorite = [...state.favorite, action.payload];
    },

    DELETE_FAVORITE: (state, action) => {
      let result = state.favorite.filter(
        favorite => favorite.name != action.payload.name
      );
      state.favorite = result;
    },

    SET_POKEMON_DATA(state, action) {
      return {
        ...state,
        pokemonData: action.payload,
      };
    },

    UPDATE_DISPLAYED_POKEMON(state, action) {
      return {
        ...state,
        displayedPokemons: action.payload,
      };
    },

    SET_IS_SHOW_LOAD_MORE(state, action) {
      return {
        ...state,
        isShowLoadMore: action.payload,
      };
    },
  },
});

export const {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  SET_POKEMON_DATA,
  UPDATE_DISPLAYED_POKEMON,
  SET_IS_SHOW_LOAD_MORE,
} = pokemonSlice.actions;

export const LIST_FAVORITE_POKEMON = state => state.pokemon.favorite;

export const POKEMON_DATA = state => state.pokemon.pokemonData;

export const DISPLAYED_POKEMONS = state => state.pokemon.displayedPokemons;

export const IS_SHOW_LOAD_MORE = state => state.pokemon.isShowLoadMore;

export default pokemonSlice.reducer;
