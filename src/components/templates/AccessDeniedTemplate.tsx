import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const AccessDeniedBox = styled.div`
    margin: auto;
    margin-top: 15vh;
    width: 50%;
    border: 3px solid red;
    padding: 12px;
    text-align: center;
    color: #ff385c;
    font-size: 20px;
`

export const AccessDeniedTemplate = () => {
    const redirect = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        document.title = 'Từ chối truy cập';

        const redirectTimer = setTimeout(() => {
            redirect('/');
        }, 6000);

        const countdownTimer = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
        }, 1000);

        return () => {
            clearTimeout(redirectTimer);
            clearInterval(countdownTimer);
        };
    }, [redirect]);

    return (
        <AccessDeniedBox>
            <div className='flex justify-center mb-3'>
                <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
            </div>
            Bạn không có quyền truy cập vào trang này!
            <br />
            Tự động quay về trang chủ trong <span className='text-[#38a832]'>{seconds} </span>giây
        </AccessDeniedBox>
    )
}
