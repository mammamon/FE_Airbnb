export type Chair = {
  thongTinPhim: {
    maLichChieu: number;
    tenCumRap: string;
    tenRap: string;
    diaChi: string;
    tenPhim: string;
    hinhAnh: string;
    ngayChieu: string;
    gioChieu: string;
  };
  danhSachGhe: 
    {
      maGhe: number;
      tenGhe: string;
      maRap: number;
      loaiGhe: string;
      stt: number;
      giaVe: number;
      daDat: boolean;
      taiKhoanNguoiDat: string;
    }[]
  ;
};

export type BookedChair = {
  maLichChieu: number,
  danhSachVe: 
    {
      maGhe: number,
      giaVe: number
    }[]
}