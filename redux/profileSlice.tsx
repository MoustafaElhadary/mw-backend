import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    selectedTab: '',
  },
  reducers: {
    setSelectedTab: (state, { payload }) => {
      state.selectedTab = payload;
    },
  },
});

export const { setSelectedTab } = profileSlice.actions;

export default profileSlice.reducer;
