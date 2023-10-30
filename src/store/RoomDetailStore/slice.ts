import { createSlice } from '@reduxjs/toolkit';
import { RoomRentListByIdType, RoomRentListByLocationType } from 'types/RoomType';
import { getRoomRentByIdThunk, getRoomRentThunk } from '.';


type RoomRentInitialState = {
  roomRentList?: RoomRentListByLocationType;
  roomRentById?:RoomRentListByIdType;
  // cinemaSchedule?: HeThongRap[];
  // movieDetail?: ThongTinPhim | undefined;
  isFetchingRoomRentList?: boolean;
};

const initialState:  RoomRentInitialState = {
  isFetchingRoomRentList: false,
};
const roomRentSlice = createSlice({
  name: 'roomRent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoomRentThunk.pending, (state) => {
      state.isFetchingRoomRentList = true;
    }).addCase(getRoomRentThunk.rejected, (state) => {
      state.isFetchingRoomRentList = false;
    }).addCase(getRoomRentThunk.fulfilled, (state, action) => {
      state.roomRentList = action.payload;
      state.isFetchingRoomRentList = false;
    })
    ;
    builder.addCase(getRoomRentByIdThunk.fulfilled, (state, action) => {
      state.roomRentById = action.payload;
    });
  },
});

export const { actions: roomRentActions, reducer: roomRentReducer } = roomRentSlice;
