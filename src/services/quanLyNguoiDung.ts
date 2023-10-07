import { apiInstance } from 'constant/apiInstance'
import { LoginSchemaType, RegisterSchemaType, AccountSchemaType } from 'schema'
import { UserByAccessToken, UserLogin } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_NGUOI_DUNG_API,
})

export const quanLyNguoiDungServices = {
    register: (data: RegisterSchemaType) => api.post('/DangKy', data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>('/DangNhap', data),
    update: (data: AccountSchemaType) => api.post('/CapNhatThongTinNguoiDung', data), 
    getUserByAccessToken: () => api.post<ApiResponse<UserByAccessToken>>('/ThongTinTaiKhoan'),
}
