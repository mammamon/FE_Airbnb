import { createSlice } from "@reduxjs/toolkit";
import { BookedChair, Chair } from "types";
import { getChairListThunk, bookedChairListThunk } from "./thunk";

type QuanLyDatVeInitialState = {
  chairList?: Chair;
  bookedList?: BookedChair;
  isFetchingChairList?: boolean;
  isFetchingBookedList?: boolean;
};

const initialState: QuanLyDatVeInitialState = {
  isFetchingChairList: false,
  isFetchingBookedList: false,
};

const quanLyDatVeSlice = createSlice({
  name: "quanLyDatVe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChairListThunk.pending, (state) => {
        state.isFetchingChairList = true;
      })
      .addCase(getChairListThunk.rejected, (state) => {
        state.isFetchingChairList = false;
      })
      .addCase(getChairListThunk.fulfilled, (state, action) => {
        state.chairList = action.payload;
        state.isFetchingChairList = false;
      });
    builder
      .addCase(bookedChairListThunk.pending, (state) => {
        state. isFetchingBookedList = false;
      })
      .addCase(bookedChairListThunk.rejected, (state) => {
        state. isFetchingBookedList = false;
      })
      .addCase(bookedChairListThunk.fulfilled, (state, action) => {
        state.bookedList = action.payload;
        state. isFetchingBookedList = true;
      });
  },
});

export const { actions: quanLyDatVeActions, reducer: quanLyDatVeReducer } =
  quanLyDatVeSlice;
