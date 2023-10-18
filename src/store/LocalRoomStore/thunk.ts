import { createAsyncThunk } from "@reduxjs/toolkit";
import { localRoomServices } from "services";

export const getLocalRoomListThunk = createAsyncThunk(
  "api/getLocalRoomList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await localRoomServices.getLocalRoomList();
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
