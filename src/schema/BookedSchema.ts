import { z } from "zod";
import { isBookingDateValid } from "utils";

const BookedSchema = z.object({
    maNguoiDung: z.string().nonempty("Vui lòng chọn người đặt phòng"),
    maPhong: z.string().nonempty("Vui lòng chọn phòng cần đặt"),
    ngayDen: z.string().nonempty("Vui lòng nhập ngày đến"),
    ngayDi: z.string().nonempty("Vui lòng nhập ngày đi"),
    soLuongKhach: z.number().min(1, "Vui lòng nhập số lượng khách"),
});

export const BookedAddSchema = BookedSchema.refine(data => isBookingDateValid(data.ngayDen, data.ngayDi, false), {
    message: "Ngày đến không được nhỏ hơn ngày đi và không được là ngày trong quá khứ",
});

export const BookedEditSchema = BookedSchema.refine(data => isBookingDateValid(data.ngayDen, data.ngayDi, true), {
    message: "Ngày đến không được nhỏ hơn ngày đi",
});
export type BookedSchemaType = z.infer<typeof BookedSchema>;

    