import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginSchemaType } from 'schema'
import { authServices } from 'services'
import {  sleep } from 'utils'

export const loginThunk = createAsyncThunk(
    'auth/signin',
    async (payload: LoginSchemaType, { rejectWithValue }) => {
        try {
            const data = await authServices.login(payload)
            await sleep(500)
            return data.data.content
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

// export const updateThunk = createAsyncThunk(
//     'quanLyNguoiDung/update',
//     async (payload: AccountSchemaType, { rejectWithValue }) => {
//         try {
//             const token = getAccessToken();
//             if (token) {
//                 const response = await authServices.update(payload);
//                 return response.data.content;
//             }
//         } catch (err) {
//             return rejectWithValue({ errorMessage: err.message });
//         }
//     }
// );


// export const getUserByAccessTokenThunk = createAsyncThunk(
//     'auth/getUserByAccessToken',
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = getAccessToken();
//             if (token) {
//                 const data = await authServices.getUserByAccessToken();
//                 return data.data.content;
//             }
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     }
// );

