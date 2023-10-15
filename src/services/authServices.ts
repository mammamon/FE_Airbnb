import { apiInstance } from 'constant/apiInstance'
import { LoginSchemaType, RegisterSchemaType } from 'schema'
import { UserByAccessToken, UserLogin } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_AUTH_API,
})

export const authServices = {
    register: async (data: RegisterSchemaType) => {
        // Tạo id ngẫu nhiên 6 chữ số
        let id = Math.floor(Math.random() * 900000) + 100000;
        data.id = id;
        const response = await api.get('/users');
        const users = response.data;
        const emailDitto = users.some(user => user.email === data.email);
        const idDitto = users.some(user => user.id === id);
        while (idDitto) {
            id = Math.floor(Math.random() * 900000) + 100000;
        }
        if (emailDitto) {
            throw new Error('Email đã tồn tại');
        }
        return api.post('/signup', data);
    },
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>('/signin', data),
    // update: (data: AccountSchemaType) => api.post('/CapNhatThongTinNguoiDung', data),
    getUserByAccessToken: () => api.post<ApiResponse<UserByAccessToken>>('/users'),
}
