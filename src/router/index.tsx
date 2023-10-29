import { RouteObject } from 'react-router-dom'
import { PATH } from 'constant'
import { AuthLayout, MainLayout, AdminLayout } from 'components'
import { Login, Register, Home, Account, RoomList, RoomDetail, Admin, AccessDenied } from 'pages'

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
    {
        element: <AdminLayout />,
        children: [
            {   
                path: PATH.admin,
                element: <Admin />,
            },
        ],
    },
    
    {
        path: PATH.accessdenied,
        element: <AccessDenied />,
    },
]
