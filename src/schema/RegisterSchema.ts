import { z } from "zod";

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
      .email("Vui lòng nhập đúng email"),
    // taiKhoan: z
    //   .string()
    //   .nonempty("Vui lòng nhập tài khoản")
    //   .min(6, "Nhập tối thiểu 6 ký tự")
    //   .max(20, "Nhập tối đa 20 ký tự"),
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
    birthday: z.coerce.date({
      invalid_type_error: "Vui lòng chọn ngày sinh nhật",
    }),
    gene: z.string()
    .regex(/^(true|false)$/, "Vui lòng chọn giới tính"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
