import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'services'
import { LoginSchemaType, AccountSchemaType } from 'schema'
import { sleep } from 'utils'
import { userManageActions } from './slice'; 

export const loginThunk = createAsyncThunk(
  'user/login',
  async (payload: LoginSchemaType, { dispatch, rejectWithValue }) => {
    try {
      const data = await userServices.login(payload)
      await sleep(800)
      localStorage.setItem('user', JSON.stringify(data.data.content));
      dispatch(userManageActions.login(data.data.content));
      return data.data.content
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateThunk = createAsyncThunk(
  'user/update',
  async (payload: { id: number; data: AccountSchemaType }, { rejectWithValue }) => {
    try {
      const response = await userServices.update(payload.id, payload.data);
      return response.data.content;
    } catch (err) {
      console.error('Error:', err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
