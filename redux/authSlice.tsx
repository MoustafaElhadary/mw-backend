import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/gotrue-js'

type SliceState = { session: Session | null }

// First approach: define the initial state using that type
const initialState: SliceState = { session: null }


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, { payload }:PayloadAction<Session>) => {
      state.session = payload;
    },
  },
});

export const { setSession } = authSlice.actions;

export default authSlice.reducer;
