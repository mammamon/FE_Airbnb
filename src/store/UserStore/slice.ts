import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { UserLogin, UserByAccessToken} from "types";
import { User } from "types";
import { loginThunk } from ".";
// import { getUserByAccessTokenThunk } from "store/UserStore";
import { getAccessToken } from "utils";

type AuthInitialState = {
  accessToken?: string;
  userLogin?: User;
  isFetchingLogin?: boolean;
};

const initialState: AuthInitialState = {
  accessToken: getAccessToken(),
  isFetchingLogin: false,
};

const authSlice = createSlice({
  name: "userManage",
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
        localStorage.setItem("ACCESSTOKEN", payload.token);
        state.accessToken = payload.token;
        // set lại user
        state.userLogin = payload;
        state.isFetchingLogin = false;
      })
      // .addCase(
      //   getUserByAccessTokenThunk.fulfilled,
      //   (state, { payload }) => {
      //     console.log('Fulfilled payload:', payload);
      //     state.userLogin = payload;
      //   }
      // );

  },
});

export const {
  actions: userManageActions,
  reducer: userManageReducer,
} = authSlice;
