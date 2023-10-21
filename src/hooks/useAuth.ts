import { useSelector } from 'react-redux'
import { RootState } from 'store'

export const useAuth = () => {
    const { userLogin } = useSelector((state: RootState) => state.userManage)
    console.log('User Login:', userLogin);
    return {
        user: userLogin,
    }
}
