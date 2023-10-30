import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingRoom } from "types";
import { sleep } from "utils";
import { bookingRoomServices } from "services";


export const getBookedRoomListThunk = createAsyncThunk(
  "bookingRoom/getBookedRoomList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await bookingRoomServices.getBookedRoomList();
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postBookingRoomThunk = createAsyncThunk(
  'bookingRoom/postBookingRoom',
  async (payload: BookingRoom, { rejectWithValue }) => {
    try {
      // const token = getAccessToken()
      // if(token){
      const data = await bookingRoomServices.
        postBookingRoom(payload)
      await sleep(500)
      return data.data.content
      // }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getBookedRoomByUserThunk = createAsyncThunk(
  "bookingRoom/getBookedRoomByUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await bookingRoomServices.getBookedRoomByUser(id);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
