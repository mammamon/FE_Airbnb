import { z } from 'zod';
import { isValidUrlSchema } from 'utils';

export const LocationSchema = z.object({
    tenViTri: z.string().nonempty({ message: 'Tên vị trí không được để trống' }),
    tinhThanh: z.string().nonempty({ message: 'Tỉnh thành không được để trống' }),
    quocGia: z.string().nonempty({ message: 'Quốc gia không được để trống' }),
    hinhAnh: z.string().refine((value) => value === "" || isValidUrlSchema(value), {
        message: "Vui lòng nhập đúng định dạng URL hoặc để trống",
    }).optional(),
});
export type LocationSchemaType = z.infer<typeof LocationSchema>;
