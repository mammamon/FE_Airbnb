import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getUserByAccessTokenThunk } from './quanLyNguoiDung';
import { rootReducer } from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
});


store.dispatch(getUserByAccessTokenThunk());

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
