import { z } from 'zod';

export const LocationSchema = z.object({
    tenViTri: z.string().nonempty({ message: 'Tên vị trí không được để trống' }),
    tinhThanh: z.string().nonempty({ message: 'Tỉnh thành không được để trống' }),
    quocGia: z.string().nonempty({ message: 'Quốc gia không được để trống' }),
    hinhAnh: z.string().optional()
});
export type LocationSchemaType = z.infer<typeof LocationSchema>;
