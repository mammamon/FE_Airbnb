import { z } from "zod";
import moment from 'moment';

// giới hạn tuổi từ 16 đến 100
const currentYear = moment().year();
const minYear = currentYear - 100;
const maxYear = currentYear - 16;

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .nonempty("Vui lòng nhập họ tên")
      .regex(
        /^[A-Za-z\s\u00C0-\u1EF9]+$/,
        "Họ tên chỉ được chứa chữ cái và khoảng trắng"
      ),
    email: z
      .string()
      .nonempty("Vui lòng nhập email")
      .email("Vui lòng nhập đúng định dạng email"),
    taiKhoan: z
      .string()
      .nonempty("Vui lòng nhập tài khoản")
      .min(6, "Nhập tối thiểu 6 ký tự")
      .max(20, "Nhập tối đa 20 ký tự"),
    password: z
      .string()
      .nonempty("Vui lòng nhập mật khẩu")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải bao gồm ít nhất 8 ký tự, gồm chữ, số, chữ viết hoa và một ký tự đặc biệt (@$!%*?&)"
      ),
    confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
    phone: z
      .string()
      .nonempty("Vui lòng nhập số điện thoại")
      .regex(/^\d{10}$/, "Số điện thoại phải chứa 10 chữ số"),
    birthday: z.string()
      .nonempty({ message: 'Vui lòng chọn ngày sinh' })
      .refine(value => {
        const format = 'YYYY.MM.DD';
        const date = moment(value, format);
        const year = date.year();
        return year >= minYear && year <= maxYear;
      }, {
        message: `Bạn chưa đủ 16 tuổi hoặc năm sinh không hợp lệ`,
      }),
    gender: z.string().refine(val => val === 'm' || val === 'f', {
      message: "Vui lòng chọn giới tính",
      path: ["gender"],
    }),
    role: z.string().refine(val => val === 'admin' || val === 'user', {
      message: "Vui lòng chọn loại tài khoản",
      path: ["role"],
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;