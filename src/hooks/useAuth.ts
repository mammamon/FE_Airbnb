import { useSelector } from 'react-redux'
import { RootState } from 'store'

export const useAuth = () => {
    const { accessToken, userLogin,userBooked } = useSelector((state: RootState) => state.quanLyNguoiDung)

    return {
        accessToken,
        user: userLogin,
        booked:userBooked,
    }
}
