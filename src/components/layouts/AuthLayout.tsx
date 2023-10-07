import { useAuth } from 'hooks'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthLayout = () => {
    // const { accessToken } = useSelector((state: RootState) => state.quanLyNguoiDung)
    const { accessToken } = useAuth()

    if (accessToken) {
        return <Navigate to="/" />
    }

    return (
        <div className="AuthLayout h-full">
            <div className="h-screen w-screen relative ">
                <div className="absolute top-0 left-0 w-full h-full">
                    <img
                        className="w-full h-full object-cover object-center"
                        src="/images/login_background.jpg"
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-50 "></div>
                <div className="auth-form absolute w-10/12 sm:w-[450px] p-[20px] top-1/2 left-1/2 bg-[rgba(0,0,0,.75)] z-20 -translate-x-1/2 -translate-y-1/2 rounded-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
