import { combineReducers } from '@reduxjs/toolkit'
import { authManagementReducer } from './AuthStore'
// import { quanLyNguoiDungReducer } from './quanLyNguoiDung'
// import { quanLyPhimReducer } from './quanLyPhim'
// import { quanLyRapReducer } from './quanLyRap'
// import { quanLyDatVeReducer } from './quanLyDatVe/slice'

export const rootReducer = combineReducers({
    authManagement: authManagementReducer,
    // quanLyPhim: quanLyPhimReducer,
    // quanLyRap: quanLyRapReducer,
    // quanLyDatVe: quanLyDatVeReducer,
})
