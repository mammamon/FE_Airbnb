import "animate.css";
import SwiperCarousel from "components/ui/SwiperCarousel";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "store";
import {
  getLocalRoomListThunk,
  getSearchPageThunk,
} from "store/LocalRoomStore";
import { localRoomServices } from "services";
import { removeLocalStorage, setLocalStorage } from "utils";
import { useSelector } from "react-redux";
import { Card, List, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";

export const HomeTemplate = () => {
  const navigate = useNavigate();
  const { pageLocalRoomList,isFetchingPageLocalRoomList } = useSelector(
    (state: RootState) => state.localRoom
  );
  const dispatch = useAppDispatch();
  const [banners, setBanners] = useState([]);
  removeLocalStorage("local");
  useEffect(() => {
    dispatch(getLocalRoomListThunk());
    const fetchBanners = async () => {
      const response = await localRoomServices.getLocalRoomList();
      setBanners(response.data.content);
    };
    fetchBanners();
    dispatch(getSearchPageThunk({ pageIndex: 1, pageSize: 11 }));
  }, [dispatch]);
  return (
    <div className="home-template mx-auto">
      <Spin tip="Loading" size="large" spinning={isFetchingPageLocalRoomList}>
        <SwiperCarousel data={banners} />
        <List
          className="mt-5"
          itemLayout="horizontal"
          grid={{ gutter: 16, column: 4 }}
          dataSource={pageLocalRoomList?.data}
          pagination={{
            pageSize: pageLocalRoomList?.data.length,
            align: "start",
          }}
          renderItem={(room) => (
            <List.Item>
              <Card
                onClick={() => {
                  setLocalStorage("localId", room.id);
                  const path = generatePath(PATH.roomList, {
                    cityName: room.tinhThanh,
                  });
                  navigate(path);
                }}
                hoverable
                style={{ width: 240 }}
                cover={<img style={{ height: 240 }} src={room.hinhAnh} />}
              >
                <Meta
                  title={
                    <a>
                      {room.tenViTri}, {room.tinhThanh}, {room.quocGia}
                    </a>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};
