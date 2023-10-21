import "animate.css"
import SwiperCarousel from '../../components/ui/SwiperCarousel';
import { useEffect, useState } from 'react';
import {  RootState, useAppDispatch } from 'store';
import { getLocalRoomListThunk, getSearchPageThunk } from 'store/LocalRoomStore';
import { localRoomServices } from 'services';
import { getLocalStorage, removeLocalStorage } from 'utils';
import { useSelector } from "react-redux";
import { Avatar, List } from "antd";

export const HomeTemplate = () => {
    const {pageLocalRoomList}= useSelector((state: RootState)=>state.localRoom)
    console.log(pageLocalRoomList)
    const dispatch = useAppDispatch();
    const [banners, setBanners] = useState([]);
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
    dispatch(getSearchPageThunk({pageIndex:1,pageSize:11}))
   },[dispatch])
    return (
        <div className='home-template'>
            <SwiperCarousel data={banners}/>
            <List
            className="mt-5"
            itemLayout="horizontal"
            dataSource={pageLocalRoomList.data}
            pagination={{
                pageSize: 3,align:"start"
              }}
            renderItem={(room) => (
              <List.Item
              className="!items-start"
              >
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={200} src={room.hinhAnh} />
                  }
                  title={<a>{room.tenViTri}, {room.tinhThanh}, {room.quocGia}</a>}
                  
                />
              </List.Item>
            )}
          />
        </div>
    )
}