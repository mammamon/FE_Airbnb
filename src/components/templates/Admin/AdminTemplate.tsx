import { BookedManageTemplate, Tabs, AdminUserManage, AdminLocationManage } from 'components'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const AdminTemplate = () => {
    useEffect(() => {
        document.title = 'Admin';
    }, []);

    // chỉ cho phép tài khoản quản trị viên vào trang này
    const userLogin = useSelector((state: RootState) => state.userManage.userLogin);
    const isAdmin = userLogin?.user?.role === 'ADMIN';
    console.log("isAdmin: ", isAdmin);
    if (!isAdmin) {
        return <Navigate to="/accessdenied" />;
    }


    return (
        <div className='admin'>
            <Tabs
                tabPosition="left"
                items={[
                    {
                        key: 'accountInfo',
                        label: 'Quản lý người dùng',
                        children: <AdminUserManage />,
                    },

                    {
                        key: 'locateManage',
                        label: 'Quản lý thông tin vị trí',
                        children: <AdminLocationManage />,
                    },
                    {
                        key: 'RoomManage',
                        label: 'Quản lý thông tin phòng',
                        // children: <BookedManageTemplate />,
                    },
                    {
                        key: 'BookedManage',
                        label: 'Quản lý đặt phòng',
                        children: <BookedManageTemplate />,
                    },
                ]}
            />
        </div>
    )
}
