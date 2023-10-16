import { apiInstance } from 'constant/apiInstance'
import { UserByAccessToken} from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_API,
})

export const userServices = {
    getUserByAccessToken: () => api.post<ApiResponse<UserByAccessToken>>('/users'),
}
