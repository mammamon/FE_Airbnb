import { createAsyncThunk } from '@reduxjs/toolkit';
import { quanLyHeThongRapServices } from 'services';

export const getCinemaListThunk = createAsyncThunk(
  'quanLyRap/getCinemaList',
  async (_, { rejectWithValue }) => {
    try {
      const data = await quanLyHeThongRapServices.getCinemaList();
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCinemaScheduleThunk = createAsyncThunk(
  'quanLyRap/getCinemaSchedule',
  async (maHeThongRap: string, { rejectWithValue }) => {
    try {
      const data = await quanLyHeThongRapServices.getCinemaSchedule(maHeThongRap);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getMovieDetailThunk = createAsyncThunk(
  'quanLyRap/getMovieDetail',
  async (MaPhim: string, { rejectWithValue }) => {
    try {
      const data = await quanLyHeThongRapServices.getMovieDetail(MaPhim);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);