import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Image,
  List,
  Rate,
  Row,
  Form,
  Space,
  message,
} from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getBookedRoomListThunk } from "store/BookingRoomStore";
import { getRoomRentByIdThunk } from "store/RoomDetailStore";
import { Search } from "components";
import { BookedRoom, FeedbackType } from "types";
import { dayFormat, getLocalStorage } from "utils";
import { getFeedbackListThunk } from "store/FeedbackStore/thunk";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";
// import dayjs from "dayjs"

export const RoomDetailTemplate = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { roomRentById } = useSelector((state: RootState) => state.roomRent);
  const { feedbackList } = useSelector((state: RootState) => state.feedback);
  const { bookedRoomList } = useSelector(
    (state: RootState) => state.bookingRoom
  );
  // const {isFetchingBookingRoom}=useSelector((state:RootState)=>state.bookingRoom)
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Đặt phòng thành công",
    });
  };
  if (getLocalStorage("userBookedRoom")) {
    success();
  }

  const onFinish = (fieldsValue: object) => {
    const feedback=fieldsValue["feedbackInput"]
    console.log(feedback)
    const starRate=fieldsValue["starRate"]
    console.log(starRate)
  }
  const furniture = {
    banLa: ["Bàn là", "https://img.icons8.com/material-outlined/24/iron.png"],
    banUi: ["Bàn ủi", "https://img.icons8.com/material-outlined/24/iron.png"],
    bep: ["Bếp", "https://img.icons8.com/material-outlined/24/gas-stove.png"],
    dieuHoa: [
      "Điều hòa",
      "https://img.icons8.com/ios-glyphs/30/air-element--v1.png",
    ],
    doXe: ["Đỗ xe", "https://img.icons8.com/material-outlined/24/parking.png"],
    hoBoi: ["Hồ bơi", "https://img.icons8.com/ios/50/lap-pool.png"],
    mayGiat: [
      "Máy giặt",
      "https://img.icons8.com/material-outlined/24/washing-machine.png",
    ],
    tivi: ["Tivi", "https://img.icons8.com/material-outlined/24/tv.png"],
    wifi: ["Wifi", "https://img.icons8.com/windows/32/wifi--v1.png"],
  };

  const bookedList: BookedRoom[] = bookedRoomList?.filter(
    (x) => x.maPhong === Number(param.roomId)
  );
  const feedbackRoomList: FeedbackType[] = feedbackList?.filter(
    (x) => x.maPhong === Number(param.roomId)
  );
  useEffect(() => {
    dispatch(getRoomRentByIdThunk(Number(param.roomId)));
    dispatch(getFeedbackListThunk());
    dispatch(getBookedRoomListThunk());
    console.log("Thông tin phòng đã được đặt", bookedRoomList);
    console.log("Thông tin phòng đã chọn", roomRentById);
    console.log("Thông tin bình luận của khách đã thuê", feedbackList);
  }, [dispatch]);
  // console.log(dayFormat.printDate(feedbackList[0]?.ngayBinhLuan));
  return (
    roomRentById && (
      <div className="room-detail-template">
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <Row gutter={16}>
            <Col className="col-image" span={6}>
              <Image
                src={roomRentById?.hinhAnh}
                className="rounded-6"
                width={"full"}
                height={200}
              />
            </Col>
            <Col className="col-desc" span={18}>
              <div>
                <h2>{roomRentById?.tenPhong}</h2>
                <p>{roomRentById?.moTa}</p>
                <p>
                  {roomRentById?.giuong} giường, {roomRentById?.phongNgu} phòng
                  ngủ, {roomRentById?.phongTam} phòng tắm, {roomRentById?.khach}{" "}
                  khách{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Space>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            padding: "15px 0",
            borderTop: "1px solid var(--secondary-color)",
          }}
        >
          <h3>Tiện nghi hiện có</h3>
          <Row gutter={16}>
            <Col className="col-furniture" span={8}>
              <Row gutter={24}>
                {Object.keys(roomRentById).map(
                  (x, i) =>
                    roomRentById[x] === true && (
                      <Col key={i} span={8}>
                        <div className="flex items-center">
                          <img
                            style={{ marginRight: "5px" }}
                            width="30"
                            height="30"
                            src={furniture[x][1]}
                            alt="iron"
                          />
                          <p key={i} className="pr-2">
                            {furniture[x][0]}
                          </p>
                        </div>
                      </Col>
                    )
                )}
              </Row>
            </Col>
            <Col className="col-booked" span={16}>
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Card style={{ width: 300 }}>
                  <h3 className="mb-2">{roomRentById?.giaTien}$/đêm</h3>
                  <div className="form-booking">
                    {contextHolder}
                    <Search
                      isSearchHeader={false}
                      guestMax={roomRentById?.khach}
                      bookedList={bookedList}
                      costRent={roomRentById?.giaTien}
                      onClickEvent={false}
                      idRoom={Number(param.roomId)}
                    />
                  </div>
                </Card>
              </Space>
            </Col>
          </Row>
        </Space>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            padding: "15px 0",
            borderTop: "1px solid var(--secondary-color)",
          }}
        >
          <h3>Bình luận</h3>
          <List
            itemLayout="vertical"
            dataSource={feedbackRoomList}
            grid={{ column: 2, gutter: 16 }}
            bordered
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
              align: "center",
            }}
            renderItem={(feedback, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={
                    <Flex>
                      <h4>{feedback.maNguoiBinhLuan}</h4>
                      <Rate disabled defaultValue={feedback.saoBinhLuan} />
                    </Flex>
                  }
                  description={dayFormat.printDate(
                    feedback[index]?.ngayBinhLuan
                  )}
                />
                <p>{feedback.noiDung} </p>
              </List.Item>
            )}
          />
        </Space>
        <Space direction="vertical" size="small" style={{
            display: "flex",
            padding: "15px 0",
          }}>
            <Form onFinish={onFinish} rootClassName="feedback-input" initialValues={{starRate:1}}>
             
              <FormItem
              rules={[{required:true,message:"Hãy nhập bình luận"}]}
              name="feedbackInput">
            <TextArea
              showCount
              maxLength={100}
              style={{ height: 120}}
              // onChange={onChange}
              placeholder="Nhập bình luận của bạn"
            />
              </FormItem>
              <FormItem rules={[{type: "number" as const,min:1,message:"Hãy chọn sao"}]}  name="starRate"  style={{marginBottom:0}}> 
                <Rate />
              </FormItem>
              <FormItem>
              <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
              </FormItem>
            </Form>
        </Space>
      </div>
    )
  );
};
