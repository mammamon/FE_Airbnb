import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "types";
import { loginThunk } from ".";

type InitialState = {
  userLogin?: UserLogin
  isFetchingLogin?: boolean;
};

const initialState: InitialState = {
  isFetchingLogin: false,
};

const userSlice = createSlice({
  name: "userManage",
  initialState,
  reducers: {
    logOut: (state, { payload }: PayloadAction<string>) => {
      console.log("action: ", payload);
      state.userLogin = undefined;
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
        // set lại user
        state.userLogin = payload;
        state.isFetchingLogin = false;
      });
  },
});

export const {
  actions: userManageActions,
  reducer: userManageReducer,
} = userSlice;
