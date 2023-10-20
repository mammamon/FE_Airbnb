import { BookedManageTemplate, Tabs, AccountInfo } from 'components'
import { useEffect } from 'react'

export const AccountTemplate = () => {
    useEffect(() => {
        document.title = 'Quản lý tài khoản';
      }, []);
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
