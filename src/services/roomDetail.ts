import { apiInstance } from 'constant/apiInstance'
import {   RoomRentListByIdType, RoomRentListByLocationType } from 'types/RoomType'

const api = apiInstance({
    baseURL: import.meta.env.VITE_ROOM_RENT_API,
})

export const roomRentServices = {
    getRoomRentListDetail: (maViTri:number) => api.get<ApiResponse<RoomRentListByLocationType>>(`/lay-phong-theo-vi-tri?maViTri=${maViTri}`),
    getRoomRentById:(id:number)=>api.get<ApiResponse<RoomRentListByIdType>>(`/${id}`)
}
