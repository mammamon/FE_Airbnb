import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'services'
import { LoginSchemaType, AccountSchemaType } from 'schema'
import { sleep } from 'utils'
import { userManageActions } from './slice';

export const loginThunk = createAsyncThunk(
  'user/login',
  async (payload: LoginSchemaType, { dispatch, rejectWithValue }) => {
    let data;
    try {
      data = await userServices.login(payload);
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      if (data) {
        await sleep(800);
        localStorage.setItem('user', JSON.stringify(data.data.content));
        localStorage.setItem('token', data.data.content.token);
        dispatch(userManageActions.login(data.data.content.user));
      }
    }
    return data.data.content;
  }
);





export const updateThunk = createAsyncThunk(
  'user/update',
  async (payload: { id: number; data: AccountSchemaType }, { rejectWithValue }) => {
    try {
      const response = await userServices.edit(payload.id, payload.data);
      return response.data.content;
    } catch (err) {
      console.error('Error:', err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
