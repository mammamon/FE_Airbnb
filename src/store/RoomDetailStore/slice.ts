import { createSlice } from '@reduxjs/toolkit';
import { RoomRentListByIdType, RoomRentListByLocationType } from 'types/RoomType';
import { getRoomRentByIdThunk, getRoomRentThunk } from '.';


type RoomRentInitialState = {
  roomRentList?: RoomRentListByLocationType;
  roomRentById?:RoomRentListByIdType;
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
    builder.addCase(getRoomRentByIdThunk.fulfilled, (state, action) => {
      state.roomRentById = action.payload;
    });
  },
});

export const { actions: roomRentActions, reducer: roomRentReducer } = roomRentSlice;
