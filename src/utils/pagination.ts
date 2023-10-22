import { apiInstance } from '../constant/apiInstance';

export const pagination = (endpoint: string, pageIndex: number, pageSize: number, keyword: string) => 
    apiInstance({
        baseURL: import.meta.env.VITE_API,
    }).get(`${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`);
