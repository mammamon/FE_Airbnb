import { createSlice } from "@reduxjs/toolkit";
import { DataByLocalType, localRoomListType } from "types";
import { getLocalRoomListThunk, getSearchPageThunk } from ".";

type LocalRoomInitialState = {
  localRoomList?: localRoomListType[];
  pageLocalRoomList?:DataByLocalType;
  isFetchingLocalRoomList?: boolean;
  isFetchingPageLocalRoomList?: boolean;
};

const initialState: LocalRoomInitialState = {
  isFetchingLocalRoomList: false,
  isFetchingPageLocalRoomList: false,
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
    builder.addCase(getSearchPageThunk.pending, (state)=>{
      state.isFetchingPageLocalRoomList=true
    })
    .addCase(getSearchPageThunk.rejected, (state)=>{
      state.isFetchingPageLocalRoomList=false
    })
    .addCase(getSearchPageThunk.fulfilled, (state,action)=>{
      state.pageLocalRoomList=action.payload
      state.isFetchingPageLocalRoomList=false
    })
  },
});

export const { actions: localRoomActions, reducer: localRoomReducer } =
  localRoomSlice;
