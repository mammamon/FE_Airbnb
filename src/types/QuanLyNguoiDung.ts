export type UserLogin = {
    taiKhoan: string
    hoTen: string
    email: string
    soDT: string
    maNhom: string
    maLoaiNguoiDung: 'KhachHang' | 'QuanTri'
    accessToken: string
}

// export type UserByAccessToken = Omit<UserLogin, 'accessToken'> & {
//     thongTinDatVe?: []
//     loaiNguoiDung: {
//         maLoaiNguoiDung: 'KhachHang' | 'QuanTri'
//     }
// }

export type UserByAccessToken = {
    taiKhoan:string,
    matKhau:string,
    hoTen:string,
    email:string,
    soDT:string,
    maNhom:string,
    maLoaiNguoiDung:string,
    loaiNguoiDung: { maLoaiNguoiDung:'KhachHang' | 'QuanTri',
    tenLoai:string,}
    thongTinDatVe:[
        {
        maVe: number,
        ngayDat: string,
        tenPhim: string,
        hinhAnh: string,
        giaVe: number,
        thoiLuongPhim: number,
        danhSachGhe: [
            {
              maHeThongRap: string,
              tenHeThongRap: string,
              maCumRap: string,
              tenCumRap: string,
              maRap: number,
              tenRap: string,
              maGhe: number,
              tenGhe: string,
            }
        ]
        }
    ]
}