import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import currencyReducer from './currencySlice';

const reducers = combineReducers({
  currency: currencyReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currency'], // only currency will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;