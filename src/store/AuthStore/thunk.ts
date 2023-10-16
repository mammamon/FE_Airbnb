    import { createAsyncThunk } from '@reduxjs/toolkit'
    import { LoginSchemaType } from 'schema'
    import { authServices } from 'services'
    import { sleep } from 'utils'

    export const loginThunk = createAsyncThunk(
        'auth/login',
        async (payload: LoginSchemaType, { rejectWithValue }) => {
            try {
                const data = await authServices.login(payload)
                await sleep(800)
                return data.data.content
            } catch (err) {
                return rejectWithValue(err)
            }
        }
    )




