import { combineReducers } from '@reduxjs/toolkit'
import { quanLyNguoiDungReducer } from './quanLyNguoiDung'
import { quanLyPhimReducer } from './quanLyPhim'
import { quanLyRapReducer } from './quanLyRap'
import { quanLyDatVeReducer } from './quanLyDatVe/slice'

export const rootReducer = combineReducers({
    quanLyNguoiDung: quanLyNguoiDungReducer,
    quanLyPhim: quanLyPhimReducer,
    quanLyRap: quanLyRapReducer,
    quanLyDatVe: quanLyDatVeReducer,
})
