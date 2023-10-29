import { Header2 } from 'components/ui/Header2'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export const AdminLayout = () => {
    return (
        <main>
            <Header2 />
            <MainWrapper id="main-content">
                <Outlet />
            </MainWrapper>
        </main>
    )
}

const MainWrapper = styled.div`
    max-width: var(--max-width);
    margin: auto;
    padding: 20px;
`
