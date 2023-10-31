import { apiInstance } from 'constant/apiInstance'
import { DataByLocalType, PageType, localRoomListType } from 'types'
import { handleError } from 'utils'

const api = apiInstance({
    baseURL: import.meta.env.VITE_LOCATION_API,
})

export const localRoomServices = {
    getLocalRoomList: () => api.get<ApiResponse<localRoomListType[]>>(""),
    getSearchPage: (pageSetup: PageType) => api.get<ApiResponse<DataByLocalType>>(`/phan-trang-tim-kiem?pageIndex=${pageSetup.pageIndex}&pageSize=${pageSetup.pageSize}`),
    uploadLocationImg: async (maViTri, formData) => {
        try {
            const response = await api.post(`/upload-hinh-vitri?maViTri=${maViTri}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const imageUrl = response.data.content.hinhAnh;
            return imageUrl;
        } catch (err) {
            handleError(err);
            return null;
        }
    },
}


