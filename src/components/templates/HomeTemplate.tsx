import {  Search } from 'components';
import "animate.css"
import SwiperCarousel from '../../components/ui/SwiperCarousel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { SearchOutlined } from '@ant-design/icons';

export const HomeTemplate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    
    return (
        <div className='home-template w-full'>
            <Search/>
            
        </div>
    )
}
