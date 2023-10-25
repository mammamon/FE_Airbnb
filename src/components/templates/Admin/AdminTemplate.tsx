import { BookedManageTemplate, Tabs, AdminUserManage } from 'components'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const AdminTemplate = () => {
    useEffect(() => {
        document.title = 'Admin';
    }, []);

    const userLogin = useSelector((state: RootState) => state.userManage.userLogin);
    console.log('userLogin:', userLogin);
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
                        // children: <BookedManageTemplate />,
                    },
                    {
                        key: 'locateManage',
                        label: 'Quản lý thông tin phòng',
                        // children: <BookedManageTemplate />,
                    },
                    {
                        key: 'locateManage',
                        label: 'Quản lý đặt phòng',
                        children: <BookedManageTemplate />,
                    },
                ]}
            />
        </div>
    )
}
