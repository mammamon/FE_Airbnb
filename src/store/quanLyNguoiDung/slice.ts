import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserByAccessToken, UserLogin } from "types";
import { getUserByAccessTokenThunk, loginThunk } from ".";
import { getAccessToken } from "utils";

type QuanLyNguoiDungInitialState = {
  accessToken?: string;
  userLogin?: UserLogin|UserByAccessToken;
  userBooked?:UserByAccessToken;
  isFetchingLogin?: boolean;
};

const initialState: QuanLyNguoiDungInitialState = {
  accessToken: getAccessToken(),
  isFetchingLogin: false,
};

const quanLyNguoiDungSlice = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  reducers: {
    logOut: (state, { payload }: PayloadAction<string>) => {
      console.log("action: ", payload);
      state.accessToken = undefined;
      state.userLogin = undefined;
      localStorage.removeItem("ACCESSTOKEN");
    },
  }, // xử lý action đồng bộ
  extraReducers(builder) {
    // xử lý action bất đồng bộ (call API)

    builder
      .addCase(loginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log("payload: ", payload);
        // lưu accessToken xuống localstorage
        localStorage.setItem("ACCESSTOKEN", payload.accessToken);
        state.accessToken = payload.accessToken;

        // set lại user
        state.userLogin = payload;
        state.isFetchingLogin = false;
      });

    builder.addCase(
      getUserByAccessTokenThunk.fulfilled,
      (state, { payload }) => {
        state.userBooked = payload;
        state.userLogin = payload;
      }
    );
  },
});

export const {
  actions: quanLyNguoiDungActions,
  reducer: quanLyNguoiDungReducer,
} = quanLyNguoiDungSlice;
