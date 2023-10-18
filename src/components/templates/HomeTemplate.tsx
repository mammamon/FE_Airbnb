import "animate.css"
import SwiperCarousel from '../../components/ui/SwiperCarousel';
import { useEffect, useState } from 'react';
import {  useAppDispatch } from 'store';
import { getLocalRoomListThunk } from 'store/LocalRoomStore';
import { localRoomServices } from 'services';
import { getLocalStorage, removeLocalStorage } from 'utils';

export const HomeTemplate = () => {
    const dispatch = useAppDispatch();
    const [banners, setBanners] = useState([]);
    // window.onbeforeunload = function () { 
    //     console.log("change")
    // }
   useEffect(()=>{
    if(getLocalStorage("local")){
        removeLocalStorage("local")
    }
    dispatch(getLocalRoomListThunk());
    const fetchBanners = async () => {
        const response = await localRoomServices.getLocalRoomList();
        setBanners(response.data.content);
    };
    fetchBanners(); 
   },[dispatch])
    return (
        <div className='home-template'>
            <SwiperCarousel data={banners}/>
        </div>
    )
}
