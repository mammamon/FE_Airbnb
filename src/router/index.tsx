import { RouteObject } from 'react-router-dom'
import { PATH } from 'constant'
import { AuthLayout, MainLayout } from 'components'
import { Login, Register, Home, Account, RoomList, RoomDetail, UserInfo } from 'pages'

export const router: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: PATH.roomList,
                element: <RoomList />
            }
            ,
            {
                path: PATH.roomDetail,
                element: <RoomDetail />
            }
            ,
            {
                path: PATH.userInfo,
                element: <UserInfo/>
            }
            ,
            {
                path: PATH.account,
                element: <Account/>
            }
            ,
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            {   
                path: PATH.login,
                element: <Login />,
            },
            {
                path: PATH.register,
                element: <Register />,
            },
        ],
    },
]
