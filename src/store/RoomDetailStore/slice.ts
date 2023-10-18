import { createSlice } from '@reduxjs/toolkit';
import { RoomRentListByLocationType } from 'types/RoomType';
import { getRoomRentThunk } from '.';


type RoomRentInitialState = {
  roomRentList?: RoomRentListByLocationType;
  // cinemaSchedule?: HeThongRap[];
  // movieDetail?: ThongTinPhim | undefined;
  isRoomRentList?: boolean;
};

const initialState:  RoomRentInitialState = {};
const roomRentSlice = createSlice({
  name: 'roomRent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomRentThunk.fulfilled, (state, action) => {
      state.roomRentList = action.payload;
    });
  },
});

export const { actions: roomRentActions, reducer: roomRentReducer } = roomRentSlice;
