import { useState, ChangeEvent } from "react";
import { apiInstance } from "constant";
import { handleError } from "./handleError";


const api = apiInstance({
    baseURL: import.meta.env.VITE_API,
});

//sort / filter bảng
export const sortFilterTable = (definitions, data) => {
    return definitions.map((definition) => ({
        ...definition,
        sorter: definition.sorter || ((a, b) => {
            const numA = parseFloat(a[definition.dataIndex]);
            const numB = parseFloat(b[definition.dataIndex]);

            if (!isNaN(numA) && !isNaN(numB)) {
                return numA - numB;
            } else {
                return String(a[definition.dataIndex]).localeCompare(String(b[definition.dataIndex]));
            }
        }),
        filters: definition.filters || [...new Set(data.map(item => item[definition.dataIndex]))].map(value => ({ text: String(value), value: String(value) })),
        onFilter: definition.onFilter || ((value, record) => String(record[definition.dataIndex]).includes(value)),
    }));
};



// phân trang
export const pagination = (endpoint: string, pageIndex: number, pageSize: number, keyword: string) =>
    api.get(`${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`);


// tìm kiếm
export const useSearch = <T>(endpoint: string) => {
    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState<T[]>([]);

    const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);
        const response = await apiInstance().get<ApiResponse<T[]>>(`${endpoint}?keyword=${newKeyword}`);
        setResults(response.data.content);
    };
    return { keyword, results, handleSearchChange };
};

// sửa
export const editItem = async (endpoint, itemId, itemData) => {
    const formData = {};
    for (const [key, value] of Object.entries(itemData)) {
        if (typeof value === 'boolean') {
            formData[key] = String(value);
        } else {
            formData[key] = value;
        }
    }

    const response = await apiInstance({
        baseURL: import.meta.env.VITE_API,
    }).put(`/${endpoint}/${itemId}`, formData);
    const updatedData = {};
    //chuyển "true" "false" ra boolean gửi tới server
    for (const [key, value] of Object.entries(response.data)) {
        if (value === 'true') {
            updatedData[key] = true;
        } else if (value === 'false') {
            updatedData[key] = false;
        } else {
            updatedData[key] = value;
        }
    }
    return updatedData;
};

//xóa
export const deleteItem = async (endpoint, itemId, useQueryString = false) => {
    const url = useQueryString ? `/${endpoint}?id=${itemId}` : `/${endpoint}/${itemId}`;
    const response = await api.delete(url);
    return response.data;
};


// Upload File
export const uploadFile = async (endpoint, maViTri, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(`${endpoint}?maViTri=${maViTri}`, formData, {
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
};



