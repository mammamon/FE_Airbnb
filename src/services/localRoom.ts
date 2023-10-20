import { apiInstance } from 'constant/apiInstance'
import { DataByLocalType, PageType, localRoomListType } from 'types'

const api = apiInstance({
    baseURL: import.meta.env.VITE_LOCATION_API,
})

export const localRoomServices = {
    getLocalRoomList: () => api.get<ApiResponse<localRoomListType[]>>(""),
    getSearchPage:(pageSetup:PageType) => api.get<ApiResponse<DataByLocalType>>(`/phan-trang-tim-kiem?pageIndex=${pageSetup.pageIndex}&pageSize=${pageSetup.pageSize}`)
}
