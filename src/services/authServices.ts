import { apiInstance } from 'constant/apiInstance'
import { LoginSchemaType, RegisterSchemaType } from 'schema'
import { UserLogin } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_API,
})

export const authServices = {
    register: (data: RegisterSchemaType) => api.post('auth/signup', data),
    login: (data: LoginSchemaType) => api.post<ApiResponse<UserLogin>>('auth/signin', data),
}
