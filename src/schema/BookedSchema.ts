import { z } from "zod";
import { isBookingDateValid } from "utils";

export const BookedSchema = z.object({
    maPhong: z.number().min(1, "Vui lòng nhập mã phòng"),
    ngayDen: z.string().nonempty("Vui lòng nhập ngày đến"),
    ngayDi: z.string().nonempty("Vui lòng nhập ngày đi"),
    soLuongKhach: z.number().min(1, "Vui lòng nhập số lượng khách"),
    maNguoiDung: z.number().min(1, "Vui lòng nhập mã người dùng"),
}).refine(data => isBookingDateValid(data.ngayDen, data.ngayDi), {
    message: "Ngày đến không được nhỏ hơn ngày đi và không được là ngày trong quá khứ",
});

export type BookedSchemaType = z.infer<typeof BookedSchema>;
