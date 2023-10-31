import { useState, ChangeEvent } from "react";
import { handleError } from "./handleError";
import { apiInstance } from "constant";

const api = apiInstance({
    baseURL: import.meta.env.VITE_API
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
    // chuyển 'true' 'false' ra boolean gửi tới server
    for (const key in itemData) {
        if (itemData[key] === "true") {
            itemData[key] = true;
        } else if (itemData[key] === "false") {
            itemData[key] = false;
        }
    }
    const response = await apiInstance({
        baseURL: import.meta.env.VITE_API,
    }).put(`/${endpoint}/${itemId}`, itemData);

    return response.data;
};


//xóa
export const deleteItem = async (endpoint, itemId, useQueryString = false) => {
    const url = useQueryString ? `/${endpoint}?id=${itemId}` : `/${endpoint}/${itemId}`;
    const response = await api.delete(url);
    return response.data;
};


// Upload File
export const uploadFile = async (endpoint, itemID, file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(`${endpoint}?maViTri=${itemID}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const imageUrl = response.data.content.hinhAnh.url;
        return imageUrl;
    } catch (err) {
        handleError(err);
        return null;
    }
};



