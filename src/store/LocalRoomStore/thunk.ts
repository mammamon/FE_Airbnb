import { createAsyncThunk } from "@reduxjs/toolkit";
import { localRoomServices } from "services";
import { PageType } from "types";

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

export const getSearchPageThunk = createAsyncThunk(
  'api/vi-tri/getSearchPageThunk',
  async (pageSetup:PageType, { rejectWithValue }) => {
    try {
      const data = await localRoomServices.getSearchPage(pageSetup);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);