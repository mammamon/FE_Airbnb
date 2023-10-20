import { CheckSquareOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import { Avatar, Col, List, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { RootState } from "store";
import { getRoomRentThunk } from "store/RoomDetailStore";
import { getLocalStorage, setLocalStorage } from "utils";
import cn from "classnames";
import GoogleMapReact from 'google-map-react';
import AnyReactComponent from 'google-map-react';

export const RoomListTemplate = () => {
  const dispatch = useAppDispatch();
  const { roomRentList } = useSelector((state: RootState) => state.roomRent);
  const [like, setLike] = useState<string[]>(getLocalStorage("roomLike")||[]);
  const furnished={banLa:"Bàn là",banUi:"Bàn ủi", bep:"Bếp",dieuHoa:"Điều hòa",doXe:"Đỗ xe",hoBoi:"Hồ bơi",mayGiat:"Máy giặt",tivi:"Tivi",wifi:"Wifi"}
  // console.log(furnished[0].toLowerCase().trim())
  const handleChecked=(roomName:string)=>{
    if(!like){
      like.push(roomName)
            setLike([...like])
            setLocalStorage("roomLike",like)
    }
    else{
      if(like.find(x=>x===roomName)){
        const unLike = like.filter(x=>x!==roomName)
        setLike([...unLike])
        setLocalStorage("roomLike",unLike)
      }
      else {
        like.push(roomName)
        setLike([...like])
        setLocalStorage("roomLike",like)
      }
    }
  }
  // google map-------------------------------------------------------------------------------

    const defaultProps = {
      center: {
        lat: 10.99835602,
        lng: 77.01502627
      },
      zoom: 20
    };
  
  // get room list by id-----------------------------------------------------------------------
  const localId = getLocalStorage("local").localInput[3];
  useEffect(() => {
    dispatch(getRoomRentThunk(localId));
  },[localId,dispatch]);
  console.log(roomRentList)
  return (
    <div className="room-list-template">
      <Row gutter={8}>
        <Col className="gutter-row" span={16}>
          <List
            header={<h2>Chỗ ở tại khu vực bạn đã chọn</h2>}
            itemLayout="horizontal"
            dataSource={roomRentList}
            renderItem={(room) => (
              <List.Item
              className="!items-start"
                extra={
                  <div>
                    <HeartOutlined
                      onClick={() => {
                        handleChecked(room.hinhAnh);
                      }}
                      className={cn({ "hidden": like?.find(x=>x===room.hinhAnh), },"btn-love")}
                    />
                      <HeartFilled
                      onClick={() => {
                        handleChecked(room.hinhAnh);
                      }}
                      className={cn({ "hidden": !like?.find(x=>x === room.hinhAnh),"checked":like?.find(x=>x===room.hinhAnh)},"btn-love")}
                    />
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar shape="square" size={200} src={room.hinhAnh} />
                  }
                  title={<a>{room.tenPhong}</a>}
                  description={<div className="flex flex-col !justify-between flex-wrap grow h-full">
                    <div>
                   <p >{ room.moTa}</p>
                    <p>{room.giuong} giường, {room.phongNgu} phòng ngủ, {room.phongTam} phòng tắm, {room.khach} khách </p>
                    </div>
                   <div className="room-furnished flex justify-between items-center">
                    <div className="flex">
                   {Object.keys(room).map((x,i) =>room[x]===true&&<p key={i} className="pr-2"><CheckSquareOutlined/>{furnished[x]}</p>)}
                    </div>
                   <p className="text-20 font-semibold">${room.giaTien} <span className="font-normal">/ tháng</span></p>
                   </div>
                   
                  </div>
                }

                  
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="gutter-row " span={8}>
        <div style={{ height: "100%", width: '100%', padding: "10px 0px", borderRadius:"10px!important"}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
        </Col>
      </Row>
    </div>
  );
};
