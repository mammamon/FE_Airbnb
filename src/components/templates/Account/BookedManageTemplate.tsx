import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getBookedRoomByUserThunk } from "store/BookingRoomStore";
import { Table } from "antd";
import { sortFilterTable } from 'utils';


export const BookedManageTemplate = () => {
  const dispatch = useAppDispatch();
  const { bookedRoomList, isFetchingBookingRoom } = useSelector(
    (state: RootState) => state.bookingRoom
  );
  const userLogin = useSelector((state: RootState) => state.userManage.userLogin);

  useEffect(() => {
    if (userLogin && userLogin.user && userLogin.user.id) {
      dispatch(getBookedRoomByUserThunk(userLogin.user.id.toString()));
    } else {
      return
    }
  }, [dispatch, userLogin]);


  if (isFetchingBookingRoom) {
    return <div>Vui lòng chờ xíu...</div>;
  }

  if (!bookedRoomList || bookedRoomList.length === 0) {
    return <div>
      API GET đặt phòng kèm ID người dùng bị 404, vui lòng xem list tổng trong trang admin (^.^)
    </div>;
  }

  const columns = sortFilterTable([
    { title: 'ID', dataIndex: 'id' },
    { title: 'Mã phòng', dataIndex: 'maPhong' },
    { title: 'Ngày đến', dataIndex: 'ngayDen' },
    { title: 'Ngày đi', dataIndex: 'ngayDi' },
    { title: 'Số lượng khách', dataIndex: 'soLuongKhach' },

  ], bookedRoomList);
  return (
    <Table columns={columns} dataSource={bookedRoomList} />
  );
};
