import { combineReducers } from '@reduxjs/toolkit'
import { authManagementReducer } from './AuthStore'
import { localRoomReducer } from './LocalRoomStore'
import { roomRentReducer } from './RoomDetailStore'
// import { quanLyNguoiDungReducer } from './quanLyNguoiDung'
// import { quanLyPhimReducer } from './quanLyPhim'
// import { quanLyRapReducer } from './quanLyRap'
// import { quanLyDatVeReducer } from './quanLyDatVe/slice'

export const rootReducer = combineReducers({
    authManagement: authManagementReducer,
    localRoom: localRoomReducer,
    roomRent: roomRentReducer,
})
