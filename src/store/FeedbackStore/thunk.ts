import { createAsyncThunk } from "@reduxjs/toolkit";
import { feedbackServices } from "services";
import { FeedbackType } from "types";


export const getFeedbackListThunk = createAsyncThunk(
  "feedback/getFeedbackList",
  async (_, { rejectWithValue }) => {
    try {
      const data = await feedbackServices.getFeedbackList();
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postFeedbackThunk = createAsyncThunk(
  "feedback/postFeedback",
  async (feedback:FeedbackType, { rejectWithValue }) => {
    try {
      const data = await feedbackServices.postFeedback(feedback);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
