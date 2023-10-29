import { createSlice } from "@reduxjs/toolkit";
import { BookedRoom, BookingRoom } from "types";
import { getBookedRoomListThunk, postBookingRoomThunk } from ".";
import {  setLocalStorage } from "utils";


type BookingRoomState = {
  bookedRoomList?: BookedRoom[];
  bookingRoom?: BookingRoom;
//   isFetchingChairList?: boolean;
  isFetchingBookingRoom?: boolean;
};

const initialState: BookingRoomState = {
//   isFetchingChairList: false,
isFetchingBookingRoom: true,
};

const bookingRoomSlice = createSlice({
  name: "bookingRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookedRoomListThunk.fulfilled, (state, action) => {
        state.bookedRoomList = action.payload;
      });
    builder
    .addCase(postBookingRoomThunk.pending,(state)=>{
      state.isFetchingBookingRoom=true
    })
  .addCase(postBookingRoomThunk.rejected,(state)=>{
    state.isFetchingBookingRoom=false
  })
  .addCase(postBookingRoomThunk.fulfilled,(state,action)=>{
    state.bookingRoom=action.payload
    state.isFetchingBookingRoom=false
    setLocalStorage("userBookedRoom",action.payload)
    
  })
  },
});

export const { actions: bookingRoomActions, reducer: bookingRoomReducer } =
  bookingRoomSlice;
