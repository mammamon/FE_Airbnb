import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from 'components'
import { PATH } from 'constant'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegisterSchema, RegisterSchemaType } from 'schema'
import { quanLyNguoiDungServices } from 'services'
import { handleError } from 'utils'

export const RegisterTemplate = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(RegisterSchema),
    })

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
        try {
            await quanLyNguoiDungServices.register(values)
            toast.success('Đăng ký thành công!', {
                position: "top-right",
                autoClose: 1000,
            });
            navigate(PATH.login)
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-600 text-30">Đăng ký</h2>
            <Input
                className="mt-16"
                placeholder="Tài khoản"
                id="taiKhoan"
                name="taiKhoan"
                error={errors?.taiKhoan?.message}
                register={register}
            />
            <Input
                type="password"
                className="mt-16"
                placeholder="Mật khẩu"
                id="matKhau"
                name="matKhau"
                error={errors?.matKhau?.message}
                register={register}
            />
            <Input
                type="password"
                className="mt-16"
                placeholder="Nhập lại mật khẩu"
                id="confirmMatKhau"
                name="confirmMatKhau"
                error={errors?.confirmMatKhau?.message}
                register={register}
            />
            <Input
                className="mt-16"
                placeholder="Họ tên"
                id="hoTen"
                name="hoTen"
                error={errors?.hoTen?.message}
                register={register}
            />
            <Input
                className="mt-16"
                placeholder="Email"
                id="email"
                name="email"
                error={errors?.email?.message}
                register={register}
            />
            <Input
                className="mt-16"
                placeholder="Số điện thoại"
                id="soDt"
                name="soDt"
                error={errors?.soDt?.message}
                register={register}
            />
            <Input
                className="mt-16"
                placeholder="Mã nhóm"
                id="maNhom"
                name="maNhom"
                error={errors?.maNhom?.message}
                register={register}
            />
            <div className="flex justify-center items-center">
                <button className="w-2/3 p-10 bg-red-500 text-white text-[20px] mt-20 rounded-10 hover:brightness-125">Đăng Ký</button>
            </div>
        </form>

    )
}
