import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
  name: 'store',
  initialState: {
    selectedTab: '',
  },
  reducers: {
    setSelectedTab: (state, { payload }) => {
      state.selectedTab = payload;
    },
  },
});

export const { setSelectedTab } = storeSlice.actions;

export default storeSlice.reducer;
