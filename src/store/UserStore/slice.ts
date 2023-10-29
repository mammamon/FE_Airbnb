import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLogin, UserByAccessToken } from "types";
import { loginThunk } from ".";
import { getUserByAccessTokenThunk } from "store/UserStore";
import { getAccessToken } from "utils";

type AuthInitialState = {
  accessToken?: string;
  userLogin?: UserLogin | UserByAccessToken;
  isFetchingLogin?: boolean;
};

const initialState: InitialState = {
  userLogin: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : undefined,
  isFetchingLogin: false,
};
const userSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserLogin>) => {
      state.userLogin = action.payload;
    },
    logOut: (state, { payload }: PayloadAction<string>) => {
      localStorage.removeItem('user');
      console.log("logOut: ", payload);
      state.userLogin = undefined;
    },
    setUserFromLocalStorage: (state, action: PayloadAction<UserLogin>) => {
      console.log('Action payload:', action.payload);
      state.userLogin = action.payload;
      console.log('New state:', state);
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
      })
      .addCase(
        getUserByAccessTokenThunk.fulfilled,
        (state, { payload }) => {
          console.log('Fulfilled payload:', payload);
          state.userLogin = payload;
        }
      );

  },
});

export const {
  actions: userManageActions,
  reducer: userManageReducer,
} = userSlice;
