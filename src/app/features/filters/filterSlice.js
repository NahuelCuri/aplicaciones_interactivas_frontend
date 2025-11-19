import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  category: null,
  priceRange: [0, 10000],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterName, value } = action.payload;
      state[filterName] = value;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
