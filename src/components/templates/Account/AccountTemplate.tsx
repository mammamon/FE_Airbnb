import { BookedManageTemplate, Tabs, AccountInfo } from 'components'
import { useAuth } from 'hooks';
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';


export const AccountTemplate = () => {
    useEffect(() => {
        document.title = 'Quản lý tài khoản';
    }, []);
    const { user } = useAuth()

    // if (!user) {
    //     return <Navigate to="/" />
    // }
    return (
        <div>
            <Tabs
                tabPosition="top"
                items={[
                    {
                        key: 'accountInfo',
                        label: 'Thông tin tài khoản',
                        children: <AccountInfo />,
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
