import { apiInstance } from 'constant/apiInstance';
import { Banner } from 'types';
import { sleep } from 'utils';

const api = apiInstance({
    baseURL: import.meta.env.VITE_QUAN_LY_PHIM_API,
});

export const quanLyBannerServices = {
    getBanners: async () => {
        await sleep(800);
        const response = await api.get<ApiResponse<Banner[]>>('/LayDanhSachBanner');
        return response;
    },
};
