import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'store';
import { BookedManageTemplate, AdminUserManage, AdminLocationManage, AdminRoomManage } from 'components';
import { Tabs } from 'components';

export const AdminTemplate = () => {
    const [activeKey, setActiveKey] = useState(localStorage.getItem('activeTabKey') || 'accountInfo');

    useEffect(() => {
        document.title = 'Admin';
    }, []);

    useEffect(() => {
        localStorage.setItem('activeTabKey', activeKey);
    }, [activeKey]);
    
    //check admin role
    const userLogin = useSelector((state: RootState) => state.userManage.userLogin);
    const isAdmin = userLogin?.user?.role === 'ADMIN';
    if (!isAdmin) {
        return <Navigate to="/accessdenied" />;
    }

    return (
        <div className='admin'>
            <Tabs
                activeKey={activeKey}
                onChange={setActiveKey}
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
                        children: <AdminRoomManage />,
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
