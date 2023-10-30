import { createSlice } from "@reduxjs/toolkit";
import { BookedRoom, BookingRoom } from "types";
import { getBookedRoomListThunk, postBookingRoomThunk, getBookedRoomByUserThunk } from ".";
import { setLocalStorage } from "utils";


type BookingRoomState = {
  bookedRoomList?: BookedRoom[];
  bookingRoom?: BookingRoom;
  //   isFetchingChairList?: boolean;
  isFetchingBookingRoom?: boolean;
};

const initialState: BookingRoomState = {
  //   isFetchingChairList: false,
  isFetchingBookingRoom: false,
};

const bookingRoomSlice = createSlice({
  name: "bookingRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookedRoomListThunk.pending, (state) => {
        state.isFetchingBookingRoom = true;
      })
      .addCase(getBookedRoomListThunk.fulfilled, (state, action) => {
        state.bookedRoomList = action.payload;
        state.isFetchingBookingRoom = false;
      })
      .addCase(getBookedRoomListThunk.rejected, (state) => {
        state.isFetchingBookingRoom = false;
      })
      .addCase(postBookingRoomThunk.pending, (state) => {
        state.isFetchingBookingRoom = true
      })
      .addCase(postBookingRoomThunk.fulfilled, (state, action) => {
        state.bookingRoom = action.payload
        state.isFetchingBookingRoom = false
        setLocalStorage("userBookedRoom", action.payload)
      })
      .addCase(postBookingRoomThunk.rejected, (state) => {
        state.isFetchingBookingRoom = false
      })
      .addCase(getBookedRoomByUserThunk.pending, (state) => {
        state.isFetchingBookingRoom = true;
      })
      .addCase(getBookedRoomByUserThunk.fulfilled, (state, action) => {
        state.bookingRoom = action.payload;
        state.isFetchingBookingRoom = false;
      })
      .addCase(getBookedRoomByUserThunk.rejected, (state) => {
        state.isFetchingBookingRoom = false;
      });
  },
});

export const { actions: bookingRoomActions, reducer: bookingRoomReducer } =
  bookingRoomSlice;
