import { apiInstance } from 'constant/apiInstance'
import { localRoomListType } from 'types/LocationType'

const api = apiInstance({
    baseURL: import.meta.env.VITE_LOCATION_API,
})

export const localRoomServices = {
    getLocalRoomList: () => api.get<ApiResponse<localRoomListType[]>>(""),
}
