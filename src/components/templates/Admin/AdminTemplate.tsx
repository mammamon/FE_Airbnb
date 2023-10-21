import { BookedManageTemplate, Tabs, AdminUserManage } from 'components'
import { useEffect } from 'react'

export const AdminTemplate = () => {
    useEffect(() => {
        document.title = 'Admin';
    }, []);
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
