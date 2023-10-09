import { createSlice } from '@reduxjs/toolkit';
import { HeThongRap, ThongTinPhim} from 'types'; 
import { getCinemaListThunk, getCinemaScheduleThunk, getMovieDetailThunk } from './thunk'; 

type QuanLyRapInitialState = {
  cinemaList?: HeThongRap[];
  cinemaSchedule?: HeThongRap[];
  movieDetail?: ThongTinPhim | undefined;
  isFetchingCinemaList?: boolean;
};

const initialState: QuanLyRapInitialState = {};
const quanLyRapSlice = createSlice({
  name: 'quanLyRap',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCinemaListThunk.fulfilled, (state, action) => {
      state.cinemaList = action.payload;
    });
    builder.addCase(getCinemaScheduleThunk.fulfilled, (state, action) => {
      state.cinemaSchedule = action.payload; 
    });
    builder.addCase(getMovieDetailThunk.fulfilled, (state, action) => {
      state.movieDetail = action.payload; 
    });
  },
});

export const { actions: quanLyRapActions, reducer: quanLyRapReducer } = quanLyRapSlice;
