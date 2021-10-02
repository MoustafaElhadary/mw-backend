import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import tabReducer from './tabSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    store: tabReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
