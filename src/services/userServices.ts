import { apiInstance } from 'constant/apiInstance'
import { UserByAccessToken, UserLogin } from 'types'
import { AccountSchemaType } from 'schema'
import { LoginSchemaType, RegisterSchemaType } from 'schema'
const api = apiInstance({
    baseURL: import.meta.env.VITE_API,
})

export const userServices = {
    register: (data: RegisterSchemaType) => api.post('auth/signup', data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>('auth/signin', data),
    update: async (id: number, data: AccountSchemaType) => {
        const updatedData = {
            ...data,
            gender: data.gender === 'true',
        };
        const response = await api.put(`/users?id=${id}`, updatedData);
        return response;
    },
    getUserByAccessToken: () => api.post<ApiResponse<UserByAccessToken>>('/users'),
};
