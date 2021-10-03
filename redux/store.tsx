import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import userReducer from './userSlice';
import authReducer from './authSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
