import { apiInstance } from 'constant/apiInstance'
import { AccountSchemaType } from 'schema'
import { LoginSchemaType, RegisterSchemaType } from 'schema'
import { UserLogin } from 'types';
import { handleError } from 'utils';
const api = apiInstance({
    baseURL: import.meta.env.VITE_API,
})

export const userServices = {
    register: (data: RegisterSchemaType) => api.post('auth/signup', data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>('auth/signin', data),
    edit: async (id: number, data: AccountSchemaType) => {
        const updatedData = {
            ...data,
            gender: data.gender === 'true',
        };
        const response = await api.put(`/users/${id}`, updatedData);
        return response;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/users?id=${id}`);
        return response.data;
    },
    pagination: (pageIndex: number, pageSize: number, keyword: string) =>
        api.get(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`),
    search: (keyword: string) => api.get(`users/search/${keyword}`),
    uploadAvatar: async (formData) => {
        try {
            const response = await api.post('/users/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const imageUrl = response.data.content.avatar;
            console.log("imageUrl: ", imageUrl);
            return imageUrl;
        } catch (err) {
            handleError(err);
            return null;
        }
    },
};

