import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'services'
import { getAccessToken } from 'utils'
import { LoginSchemaType, AccountSchemaType } from 'schema'
import { sleep } from 'utils'

export const loginThunk = createAsyncThunk(
  'user/login',
  async (payload: LoginSchemaType, { rejectWithValue }) => {
    try {
      const data = await userServices.login(payload)
      await sleep(800)
      return data.data.content
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getUserByAccessTokenThunk = createAsyncThunk(
  'user/getUserByAccesToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAccessToken()
      if (token) {
        const data = await userServices.getUserByAccessToken()
        return data.data.content
      }
    } catch (err) {
      console.error('Error:', err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateThunk = createAsyncThunk(
  'user/update',
  async (payload: { id: number; data: AccountSchemaType }, { rejectWithValue }) => {
    try {
      const token = getAccessToken();
      if (token) {
        const response = await userServices.update(payload.id, payload.data);
        return response.data.content;
      }
    } catch (err) {
      console.error('Error:', err);
      return rejectWithValue(err.response.data.message);
    }
  }
);















