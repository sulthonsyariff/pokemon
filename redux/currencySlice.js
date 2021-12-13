import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    listCurrency: [
      {
        name: 'IDR'
      },
      {
        name: 'EUR'
      },
      {
        name: 'GBP' 
      },
      {
        name: 'SGD'
      }
    ]
  },
  reducers: {
    ADD_CURRENCY: (state, action) => {
      state.listCurrency = [...state.listCurrency, action.payload];
    },
    DELETE_CURRENCY: (state, action) => {
      if (state.listCurrency.length === 1) return
      let result = state.listCurrency.filter((currency) => currency.name != action.payload.name);
      state.listCurrency = result;
    },
  },
});

export const { ADD_CURRENCY, DELETE_CURRENCY } = currencySlice.actions;

export const selectListCurrency = state => state.currency.listCurrency;

export default currencySlice.reducer;
