import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginSchemaType } from 'schema'
import { AccountSchemaType } from 'schema/AccountSchema'
import { quanLyNguoiDungServices } from 'services'
import { getAccessToken, sleep } from 'utils'

export const loginThunk = createAsyncThunk(
    'quanLyNguoiDung/login',
    async (payload: LoginSchemaType, { rejectWithValue }) => {
        try {
            const data = await quanLyNguoiDungServices.login(payload)
            await sleep(500)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateThunk = createAsyncThunk(
    'quanLyNguoiDung/update',
    async (payload: AccountSchemaType, { rejectWithValue }) => {
        try {
            const token = getAccessToken();
            if (token) {
                const response = await quanLyNguoiDungServices.update(payload);
                return response.data.content;
            }
        } catch (err) {
            return rejectWithValue({ errorMessage: err.message });
        }
    }
);


export const getUserByAccessTokenThunk = createAsyncThunk(
    'quanLyNguoiDung/getUserByAccessToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = getAccessToken();
            if (token) {
                const data = await quanLyNguoiDungServices.getUserByAccessToken();
                return data.data.content;
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

