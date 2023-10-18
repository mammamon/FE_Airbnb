import { createSlice } from "@reduxjs/toolkit";
import { localRoomListType } from "types";
import { getLocalRoomListThunk } from ".";

type LocalRoomInitialState = {
  localRoomList?: localRoomListType[];
  isFetchingLocalRoomList?: boolean;
};

const initialState: LocalRoomInitialState = {
  isFetchingLocalRoomList: false,
};

const localRoomSlice = createSlice({
  name: "localRoom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocalRoomListThunk.pending, (state) => {
        state.isFetchingLocalRoomList = true;
      })
      .addCase(getLocalRoomListThunk.rejected, (state) => {
        state.isFetchingLocalRoomList = false;
      })
      .addCase(getLocalRoomListThunk.fulfilled, (state, action) => {
        state.localRoomList = action.payload;
        state.isFetchingLocalRoomList = false;
      });
  },
});

export const { actions: localRoomActions, reducer: localRoomReducer } =
  localRoomSlice;
