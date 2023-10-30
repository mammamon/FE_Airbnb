import { createAsyncThunk } from "@reduxjs/toolkit";
import { localRoomServices } from "services";
import { PageType } from "types";
import { sleep } from "utils";

export const getLocalRoomListThunk = createAsyncThunk(
  "localRoom/getLocalRoomList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await localRoomServices.getLocalRoomList();
      await sleep(500)
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getSearchPageThunk = createAsyncThunk(
  'localRoom/getSearchPage',
  async (pageSetup:PageType, { rejectWithValue }) => {
    try {
      const data = await localRoomServices.getSearchPage(pageSetup);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);