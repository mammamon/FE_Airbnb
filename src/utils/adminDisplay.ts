import moment from "moment";

//đổi tên hiển thị
export const genderDisplay = {
    'true': 'Nam',
    'false': 'Nữ',
};

export const roleDisplay = {
    'ADMIN': 'Quản trị viên',
    'Admin': 'Quản trị viên',
    'admin': 'Quản trị viên',
    'USER': 'Người dùng',
    'User': 'Người dùng',
    'user': 'Người dùng',
};

export const tongTienDisplay = (giaTien, ngayDen, ngayDi) => {
  const dateDifference = moment(ngayDi).diff(moment(ngayDen), 'days');
  const days = dateDifference === 0 ? 1 : dateDifference;
  return giaTien * days;
};

// ...

// <Descriptions column={1}>
//   <Descriptions.Item label="ID">{selectedBookedDetails.id}</Descriptions.Item>
//   <Descriptions.Item label="Ngày đến">{moment(selectedBookedDetails.ngayDen).format('DD/MM/YYYY')}</Descriptions.Item>
//   <Descriptions.Item label="Ngày đi">{moment(selectedBookedDetails.ngayDi).format('DD/MM/YYYY')}</Descriptions.Item>
//   <Descriptions.Item label="Số lượng khách">{selectedBookedDetails.soLuongKhach}</Descriptions.Item>
//   <Descriptions.Item label="Tên phòng">{room && room.tenPhong}</Descriptions.Item>
//   <Descriptions.Item label="Giá tiền">{room && room.giaTien}</Descriptions.Item>
//   <Descriptions.Item label="Tên người dùng">{user && user.name}</Descriptions.Item>
//   <Descriptions.Item label="Ảnh đại diện">{user && user.avatar}</Descriptions.Item>
//   <Descriptions.Item label="Tổng tiền">{calculateTongTien(room.giaTien, selectedBookedDetails.ngayDen, selectedBookedDetails.ngayDi)}</Descriptions.Item>
// </Descriptions>
