import { z } from "zod";
import { isValidUrlSchema } from "utils";

export const RoomSchema = z.object({
    tenPhong: z.string().nonempty("Vui lòng nhập tên phòng"),
    khach: z.number().min(1, "Vui lòng nhập số khách"),
    phongNgu: z.number().min(1, "Vui lòng nhập số phòng ngủ"),
    giuong: z.number().min(1, "Vui lòng nhập số giường"),
    phongTam: z.number().min(1, "Vui lòng nhập số phòng tắm"),
    giaTien: z.number().min(1, "Vui lòng nhập giá tiền"),
    moTa: z.string().nonempty("Vui lòng nhập mô tả"),
    mayGiat: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho máy giặt",
        path: ["mayGiat"],
    }),
    banLa: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho bàn là",
        path: ["banLa"],
    }),
    tivi: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho ti vi",
        path: ["tivi"],
    }),
    dieuHoa: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho điều hòa",
        path: ["dieuHoa"],
    }),
    wifi: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho wifi",
        path: ["wifi"],
    }),
    bep: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho bếp",
        path: ["bep"],
    }),
    doXe: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho đỗ xe",
        path: ["doXe"],
    }),
    hoBoi: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho hồ bơi",
        path: ["hoBoi"],
    }),
    banUi: z.string().refine(val => val === 'true' || val === 'false', {
        message: "Vui lòng chọn có hoặc không cho bàn ủi",
        path: ["banUi"],
    }),
    maViTri:z.string().nonempty("Vui lòng nhập tên phòng"),
    hinhAnh: z.string().refine((value) => value === "" || isValidUrlSchema(value), {
        message: "Vui lòng nhập đúng định dạng URL hoặc để trống",
      }).optional(),
});

export type RoomSchemaType = z.infer<typeof RoomSchema>;
