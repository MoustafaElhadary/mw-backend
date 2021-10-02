import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    selectedTab: '',
  },
  reducers: {
    setSelectedTab: (state, { payload }) => {
      state.selectedTab = payload;
    },
  },
});

export const { setSelectedTab } = userSlice.actions;

export default userSlice.reducer;
