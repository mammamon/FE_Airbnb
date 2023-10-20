import { createSlice } from "@reduxjs/toolkit";
import { DataByLocalType, localRoomListType } from "types";
import { getLocalRoomListThunk, getSearchPageThunk } from ".";

type LocalRoomInitialState = {
  localRoomList?: localRoomListType[];
  pageLocalRoomList?:DataByLocalType;
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
    builder.addCase(getSearchPageThunk.fulfilled, (state,action)=>{
      state.pageLocalRoomList=action.payload
    })
  },
});

export const { actions: localRoomActions, reducer: localRoomReducer } =
  localRoomSlice;
