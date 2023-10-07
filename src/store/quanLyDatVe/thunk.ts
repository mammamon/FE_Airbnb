import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyDatVeServices } from "services";
import { BookedChair } from "types";
import { getAccessToken, sleep } from "utils";

export const getChairListThunk = createAsyncThunk(
  "quanLyDatVe/getChairList",
  async (MaLichChieu: string, { rejectWithValue }) => {
    try {
      const data = await quanLyDatVeServices.getChairList(MaLichChieu);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const bookedChairListThunk = createAsyncThunk(
  'quanLyDatVe/bookedChairList',
  async (payload: BookedChair, { rejectWithValue }) => {
      try {
        const token = getAccessToken()
        if(token){
          const data = await quanLyDatVeServices.
          bookedChairList(payload)
          await sleep(500)
          return data.data.content
        }
      } catch (err) {
          return rejectWithValue(err)
      }
  }
)
