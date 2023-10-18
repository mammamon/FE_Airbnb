import { BookedManageTemplate, Tabs, AccountInfo } from 'components'

export const AccountTemplate = () => {
    return (
        <div>
            <Tabs
                tabPosition="top"
                items={[
                    {
                        key: 'accountInfo',
                        label: 'Thông tin tài khoản',
                        children: <AccountInfo/>,
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
