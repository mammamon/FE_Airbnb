import { useSelector } from 'react-redux'
import { RootState } from 'store'

export const useAuth = () => {
    const { accessToken, userLogin } = useSelector((state: RootState) => state.userManage)
    console.log('Access Token:', accessToken);
    console.log('User Login:', userLogin);
    return {
        accessToken,
        user: userLogin,
    }
}
