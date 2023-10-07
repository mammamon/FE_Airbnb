import { z } from 'zod';

export const RegisterSchema = z.object({
    taiKhoan: z
        .string()
        .nonempty('Vui lòng nhập tài khoản')
        .min(6, 'Nhập tối thiểu 6 ký tự')
        .max(20, 'Nhập tối đa 20 ký tự'),
    matKhau: z
        .string()
        .nonempty('Vui lòng nhập mật khẩu')
        .regex(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu phải bao gồm ít nhất 8 ký tự, gồm chữ, số, chữ viết hoa và một ký tự đặc biệt (@$!%*?&)'
        ),
    confirmMatKhau: z.string().nonempty('Vui lòng nhập lại mật khẩu'),
    email: z.string().nonempty('Vui lòng nhập email').email('Vui lòng nhập đúng email'),
    soDt: z
        .string()
        .nonempty('Vui lòng nhập số điện thoại')
        .regex(/^\d{10}$/, 'Số điện thoại phải chứa 10 chữ số'),

    maNhom: z.string().nonempty('Vui lòng nhập mã nhóm'),
    hoTen: z
        .string()
        .nonempty('Vui lòng nhập họ tên')
        .regex(/^[A-Za-z\s\u00C0-\u1EF9]+$/, 'Họ tên chỉ được chứa chữ cái và khoảng trắng'),
}).refine(data => data.matKhau === data.confirmMatKhau, {
    message: 'Mật khẩu không khớp',
    path: ['confirmMatKhau'],
});


export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
