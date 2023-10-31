import { z } from 'zod'
import { isAgeValid f} from 'utils';

export const AccountSchema = z.object({
  name: z.string()
    .nonempty("Vui lòng nhập họ tên")
    .regex(/^[A-Za-z\s\u00C0-\u1EF9]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
  email: z.string()
    .nonempty("Vui lòng nhập email")
    .email("Vui lòng nhập đúng định dạng email"),
  // avatar: z.string().refine((value) => value === "" || isValidUrlSchema(value), {
  //   message: "Vui lòng nhập đúng định dạng URL hoặc để trống",
  // }).optional(),
  password: z.string()
    .nonempty("Vui lòng nhập mật khẩu")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Mật khẩu phải bao gồm ít nhất 8 ký tự, gồm chữ, số, chữ viết hoa và một ký tự đặc biệt (@$!%*?&)"),
  confirmPassword: z.string().nonempty("Vui lòng nhập lại mật khẩu"),
  phone: z.string()
    .nonempty("Vui lòng nhập số điện thoại")
    .regex(/^\d{10}$/, "Số điện thoại phải chứa 10 chữ số"),
  birthday: z.string()
    .nonempty({ message: 'Vui lòng chọn ngày sinh' })
    .refine(isAgeValid, {
      message: `Bạn chưa đủ 16 tuổi hoặc năm sinh không hợp lệ`,
    }),
  gender: z.string().refine(val => val === 'true' || val === 'false', {
    message: "Vui lòng chọn giới tính",
    path: ["gender"],
  }),
  role: z.string().refine(val => val === 'ADMIN' || val === 'USER', {
    message: "Vui lòng chọn loại tài khoản",
    path: ["role"],
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

export type AccountSchemaType = z.infer<typeof AccountSchema>
