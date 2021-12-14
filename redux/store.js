import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import pokemonReducer from './pokemonSlice';

const reducers = combineReducers({
  pokemon: pokemonReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pokemon'], // only pokemon will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;