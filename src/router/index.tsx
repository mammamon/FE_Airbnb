import { RouteObject } from 'react-router-dom'
import { PATH } from 'constant'
import { AuthLayout, MainLayout } from 'components'
import { Login, Register, Home, Account, BookingMovie } from 'pages'
import { Detail } from 'pages/Detail'

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
                path: PATH.account,
                element: <Account />
            }
            ,
            {
                path: PATH.detail,
                element: <Detail />
            }
            ,
            {
                path: PATH.booking,
                element: <BookingMovie/>
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
