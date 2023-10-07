import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from 'components/ui'
import { useAuth } from 'hooks'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AccountSchema, AccountSchemaType } from 'schema/AccountSchema'
import { AppDispatch } from 'store'
import { updateThunk } from 'store/quanLyNguoiDung/thunk';

export const AccountInfo = () => {
    const { user } = useAuth()
    const {
        reset,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AccountSchemaType>({
        resolver: zodResolver(AccountSchema),
        mode: 'onChange',
    })
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit: SubmitHandler<AccountSchemaType> = (value) => {
        dispatch(updateThunk(value));
    }


    useEffect(() => {
        reset({
            ...user,
            soDt: user?.soDT,
        })
    }, [user, reset])

    // life cycle + useRef, useCallback, useMemo

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-20 font-600">Thông tin tài khoản</p>
            <Input
                className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
                label="Tài khoản"
                name="taiKhoan"
                error={errors?.taiKhoan?.message}
                register={register}
            />
            <Input
                className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
                label="Họ và tên"
                name="hoTen"
                error={errors?.hoTen?.message}
                register={register}
            />
            <Input
                className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
                label="Email"
                name="email"
                error={errors?.email?.message}
                register={register}
            />
            <Input
                className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
                label="Số điện thoại"
                name="soDt"
                error={errors?.soDt?.message}
                register={register}
            />
            <Input
                className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
                label="Mã nhóm"
                name="maNhom"
                error={errors?.maNhom?.message}
                register={register}
            />
            <Input
                className="[&>label]:text-black [&>input]:bg-transparent [&>input]:border [&>input]:border-black [&>input]:text-black"
                label="Mã loại người dùng"
                name="maLoaiNguoiDung"
                register={register}
                selectOptions={['KhachHang', 'QuanTri']}
            />
            <div className="text-right mt-20">
                <Button htmlType="submit" type="primary" className="!h-[46px]">
                    Hoàn thành chỉnh sửa
                </Button>
            </div>
        </form>
    )
}
