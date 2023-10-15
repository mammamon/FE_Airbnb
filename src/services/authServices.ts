import { apiInstance } from 'constant/apiInstance'
import { LoginSchemaType, RegisterSchemaType } from 'schema'
import { UserByAccessToken, UserLogin } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_AUTH_API,
})

export const authServices = {
    register: (data: RegisterSchemaType) => api.post('/signup', data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>('/signin', data),
    // update: (data: AccountSchemaType) => api.post('/CapNhatThongTinNguoiDung', data),
    getUserByAccessToken: () => api.post<ApiResponse<UserByAccessToken>>('/users'),
}
