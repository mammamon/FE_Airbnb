import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "types";
import { loginThunk } from ".";

type InitialState = {
  userLogin?: UserLogin
  isFetchingLogin?: boolean;
  userBooked: string | null;
};

const initialState: InitialState = {
  userLogin: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : undefined,
  isFetchingLogin: false,
  userBooked: null,
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
      state.userLogin = action.payload;
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
