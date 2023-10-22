import { useState } from 'react';

export const useSearch = (initialKeyword = '') => {
    const [keyword, setKeyword] = useState(initialKeyword);

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
    };

    return { keyword, handleSearchChange };
};
