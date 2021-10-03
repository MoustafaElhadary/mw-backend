import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { definitions } from 'types/supabase';

type SliceState = { profile: definitions['profiles'] | null };

// First approach: define the initial state using that type
const initialState: SliceState = { profile: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (
      state,
      { payload }: PayloadAction<definitions['profiles']>
    ) => {
      state.profile = payload;
    },
  },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;
