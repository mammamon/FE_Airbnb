import { apiInstance } from 'constant/apiInstance'
import {   RoomRentListByLocationType } from 'types/RoomType'

const api = apiInstance({
    baseURL: import.meta.env.VITE_ROOM_DETAIL_API,
})

export const roomRentServices = {
    getRoomRentListDetail: (maViTri:number) => api.get<ApiResponse<RoomRentListByLocationType>>(`/lay-phong-theo-vi-tri?maViTri=${maViTri}`),
}
