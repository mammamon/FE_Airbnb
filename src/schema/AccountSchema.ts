import { z } from 'zod'

export const AccountSchema = z.object({
    taiKhoan: z.string().nonempty('Vui lòng nhập tài khoản'),
    hoTen: z.string().nonempty('Vui lòng nhập họ tên').regex(/^[A-Za-z\s\u00C0-\u1EF9]+$/, {
      message: 'Họ tên chỉ được chứa chữ cái và khoảng trắng',
    }),
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng email'),
    soDt: z.string().regex(/^\d{10}$/, {
      message: 'Số điện thoại phải có 10 chữ số',
    }),
    maNhom: z.string().regex(/^GP\d{2}$/, {
      message: 'Mã nhóm phải theo định dạng "GP01, GP02, ..."',
    }),
    maLoaiNguoiDung: z.custom((value) => {
        if (value !== 'KhachHang' && value !== 'QuanTri') {
          throw new Error('Mã loại người dùng không hợp lệ');
        }
        return value;
      }),
  });

export type AccountSchemaType = z.infer<typeof AccountSchema>
