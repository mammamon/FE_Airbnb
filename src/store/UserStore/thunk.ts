import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'services'
import { getAccessToken } from 'utils'

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