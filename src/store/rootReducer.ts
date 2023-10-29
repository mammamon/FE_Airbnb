import { combineReducers } from '@reduxjs/toolkit'
import { localRoomReducer } from './LocalRoomStore'
import { roomRentReducer } from './RoomDetailStore'
import { userManageReducer } from './UserStore'
import { bookingRoomReducer } from './BookingRoomStore'
import { feedbackReducer } from './FeedbackStore'
// import { quanLyNguoiDungReducer } from './quanLyNguoiDung'
// import { quanLyPhimReducer } from './quanLyPhim'
// import { quanLyRapReducer } from './quanLyRap'
// import { quanLyDatVeReducer } from './quanLyDatVe/slice'

export const rootReducer = combineReducers({
    userManage: userManageReducer,
    localRoom: localRoomReducer,
    roomRent: roomRentReducer,
    bookingRoom:bookingRoomReducer,
    feedback:feedbackReducer,

})
