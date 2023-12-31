import axios, { AxiosRequestHeaders, CreateAxiosDefaults } from 'axios'

const tokenCybersoft =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NyIsIkhldEhhblN0cmluZyI6IjE1LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNzk1NTIwMDAwMCIsIm5iZiI6MTY3ODk4NjAwMCwiZXhwIjoxNzA4MTAyODAwfQ.YGLcwOu11pM9sD9C2a0dia7O_6vvsYwkCoo1sqcbCFM'

export const apiInstance = (config?: CreateAxiosDefaults) => {
    const api = axios.create(config)
    api.interceptors.request.use((config) => {
        const headers = {
            tokenCybersoft,
            token:JSON.parse(localStorage.getItem('token'))||''
        } as unknown as AxiosRequestHeaders;
        // const token = localStorage.getItem('token');
        // console.log(token)
        // if (token) {
        //     headers.Authorization = token || '';
        // }
        // console.log('Request Headers:', headers);
        return {
            ...config,
            headers: headers,
        }
    })

    return api
}

// import axios, { AxiosRequestHeaders, CreateAxiosDefaults } from 'axios'
// import { getAccessToken } from 'utils'

// const TokenCybersoft =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NyIsIkhldEhhblN0cmluZyI6IjE1LzAyLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNzk1NTIwMDAwMCIsIm5iZiI6MTY3ODk4NjAwMCwiZXhwIjoxNzA4MTAyODAwfQ.YGLcwOu11pM9sD9C2a0dia7O_6vvsYwkCoo1sqcbCFM'

// export const apiInstance = (config?: CreateAxiosDefaults) => {
//     const api = axios.create(config)
//     api.interceptors.request.use((config) => {
//         return {
//             ...config,
//             headers: {
//                 TokenCybersoft,
//                 token: getAccessToken() || '',
//             } as unknown as AxiosRequestHeaders,
//         }
//     })

//     return api
// }
