import { apiInstance } from 'constant/apiInstance'
import { Movie } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API,
})

export const quanLyPhimServices = {
    getMovieList: (query = '') => api.get<ApiResponse<Movie[]>>(`/LayDanhSachPhim${query}`),
}
