import {  BookedManageTemplate, LocateManageTemplate, RoomManageTemplate, Tabs, UserManage } from 'components'

export const AccountTemplate = () => {
    return (
        <div>
            <Tabs
                tabPosition="left"
                items={[
                    {
                        key: 'userManage',
                        label: 'Quản lý người dùng',
                        children: <UserManage/>,
                    },
                    {
                        key: 'locateManage',
                        label: 'Quản lý thông tin vị trí',
                        children: <LocateManageTemplate />,
                    },
                    {
                        key: 'locateManage',
                        label: 'Quản lý thông tin phòng',
                        children: <RoomManageTemplate />,
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
