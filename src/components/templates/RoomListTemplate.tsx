import {
  CheckSquareOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Col, List, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { RootState } from "store";
import { getRoomRentThunk } from "store/RoomDetailStore";
import { getLocalStorage, setLocalStorage } from "utils";
import cn from "classnames";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { PATH } from "constant";


export const RoomListTemplate = () => {
  const navigate = useNavigate()
  const param=useParams()
  const dispatch = useAppDispatch();
  const { roomRentList } = useSelector((state: RootState) => state.roomRent);
  const [like, setLike] = useState<number[]>(getLocalStorage("roomLike") || []);
  const  furniture = {
    banLa: "Bàn là",
    banUi: "Bàn ủi",
    bep: "Bếp",
    dieuHoa: "Điều hòa",
    doXe: "Đỗ xe",
    hoBoi: "Hồ bơi",
    mayGiat: "Máy giặt",
    tivi: "Tivi",
    wifi: "Wifi",
  };
  const handleChecked = (roomName: number) => {
    if (!like) {
      like.push(roomName);
      setLike([...like]);
      setLocalStorage("roomLike", like);
    } else {
      if (like.find((x) => x === roomName)) {
        const unLike = like.filter((x) => x !== roomName);
        setLike([...unLike]);
        setLocalStorage("roomLike", unLike);
      } else {
        like.push(roomName);
        setLike([...like]);
        setLocalStorage("roomLike", like);
      }
    }
  };
  // get room list by id-----------------------------------------------------------------------
  useEffect(() => {
    dispatch(getRoomRentThunk(getLocalStorage("local")?.localId));
    console.log("danh sách phòng thuê",roomRentList)
  }, [dispatch,param]);
  return (
    <div className="room-list-template py-10">
      <Row gutter={16}>
        <Col className="gutter-row" span={16}>
          <List
            header={<h2>Chỗ ở tại khu vực bạn đã chọn</h2>}
            itemLayout="horizontal"
            dataSource={roomRentList}
            renderItem={(room) => (
              <List.Item
                className="!items-start cursor-pointer"
              
                extra={
                  <div>
                    <HeartOutlined
                      onClick={() => {
                        handleChecked(room.id);
                      }}
                      className={cn(
                        { hidden: like?.find((x) => x === room.id) },
                        "btn-love"
                      )}
                    />
                    <HeartFilled
                      onClick={() => {
                        handleChecked(room.id);
                      }}
                      className={cn(
                        {
                          hidden: !like?.find((x) => x === room.id),
                          checked: like?.find((x) => x === room.id),
                        },
                        "btn-love"
                      )}
                    />
                  </div>
                }
              >
                <List.Item.Meta
                
                  avatar={
                    <Avatar onClick={()=>{
                      const path = generatePath(PATH.roomDetail,{roomId:room.id})
                      navigate(path)}}  shape="square" size={200} src={room.hinhAnh} />
                  }
                  title={<a onClick={()=>{
                    const path = generatePath(PATH.roomDetail,{roomId:room.id})
                    navigate(path)}}  >{room.tenPhong}</a>}
                  description={
                    <div onClick={()=>{
                      const path = generatePath(PATH.roomDetail,{roomId:room.id})
                      navigate(path)}} className="flex flex-col !justify-between flex-wrap grow h-full">
                      <div>
                        <p>{room.moTa}</p>
                        <p>
                          {room.giuong} giường, {room.phongNgu} phòng ngủ,{" "}
                          {room.phongTam} phòng tắm, {room.khach} khách{" "}
                        </p>
                      </div>
                      <div className="room-furniture flex !justify-between items-start">
                        <div className="flex flex-wrap">
                          {Object.keys(room).map(
                            (x, i) =>
                              room[x] === true && (
                                <p key={i} className="pr-2">
                                  <CheckSquareOutlined />
                                  { furniture[x]}
                                </p>
                              )
                          )}
                        </div>
                        <p className="text-20 text-right font-semibold w-3/12">
                          ${room.giaTien}{" "}
                          <span className="font-normal">/ tháng</span>
                        </p>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col className="gutter-row " span={8}>
          {
            <div
              style={{
                height: "100%",
                width: "100%",
                padding: "10px 0px",
                borderRadius: "10px!important",
              }}
            >
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7837.3828994298865!2d106.6787312!3d10.8349079!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b7942b7e2f%3A0x50d7a6c4ec8fc737!2zTmjDoCB0aOG7nSBHacOhbyB44bupIFThu60gxJDDrG5o!5e0!3m2!1svi!2s!4v1697872409631!5m2!1svi!2s" width="100%" height="100%" className="!shadow-lg" style={{border:"0",}} loading="lazy" ></iframe>
              {/* <GoogleMap zoom={10} center={{lat:44,lng:-80}} mapContainerClassName="main-container"></GoogleMap> */}
            </div>
          }
        </Col>
      </Row>
    </div>
  );
};
