import { apiInstance } from 'constant/apiInstance'
import { BookedRoom, BookingRoom } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_BOOKING_ROOM_API,
})

export const bookingRoomServices = {
    getBookedRoomList: () => api.get<ApiResponse<BookedRoom[]>>(''),
    postBookingRoom: (data:BookingRoom) => api.post<ApiResponse<BookingRoom>>('',data),
}
