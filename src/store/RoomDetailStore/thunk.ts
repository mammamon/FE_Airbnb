import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomRentServices } from 'services';
import { sleep } from 'utils';

export const getRoomRentThunk = createAsyncThunk(
  'roomRent/getRoomDetail',
  async (maViTri:number, { rejectWithValue }) => {
    try {
      const data = await roomRentServices.getRoomRentListDetail(maViTri);
      await sleep(500)
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getRoomRentByIdThunk = createAsyncThunk(
  'roomRent/getRoomRentById',
  async (id:number, { rejectWithValue }) => {
    try {
      const data = await roomRentServices.getRoomRentById(id);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// export const getCinemaScheduleThunk = createAsyncThunk(
//   'quanLyRap/getCinemaSchedule',
//   async (maHeThongRap: string, { rejectWithValue }) => {
//     try {
//       const data = await quanLyHeThongRapServices.getCinemaSchedule(maHeThongRap);
//       return data.data.content;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// export const getMovieDetailThunk = createAsyncThunk(
//   'quanLyRap/getMovieDetail',
//   async (MaPhim: string, { rejectWithValue }) => {
//     try {
//       const data = await quanLyHeThongRapServices.getMovieDetail(MaPhim);
//       return data.data.content;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );