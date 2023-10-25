import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'store';
import { loginThunk, userManageActions } from 'store/UserStore';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { userLogin } = useSelector((state: RootState) => state.userManage);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            dispatch(userManageActions.setUserFromLocalStorage(userData));
        }
    }, [dispatch]);

    const handleLogin = async (credentials) => {
        dispatch(loginThunk(credentials));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(userManageActions.logOut());
    };

    console.log('User data:', userLogin);

    return {
        user: userLogin,
        login: handleLogin,
        logout: handleLogout,
    };
};
