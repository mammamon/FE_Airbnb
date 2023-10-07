import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button } from 'components'
import { PATH } from 'constant'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { generatePath, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginSchema, LoginSchemaType } from 'schema'
import { RootState, useAppDispatch } from 'store'
import { loginThunk } from 'store/quanLyNguoiDung'
import { handleError } from 'utils'
import { useEffect} from "react";

export const LoginTemplate = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
    })
    useEffect(()=>{
        localStorage.getItem("bookingId")&&toast.info('Dăng nhập trước khi đặt vé!', {
            position: "top-center",
            autoClose: 1000,
        })
    },[ localStorage.getItem("bookingId")])
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { isFetchingLogin } = useSelector((state: RootState) => state.quanLyNguoiDung)

    const onSubmit: SubmitHandler<LoginSchemaType> = (value) => {
        
        console.log('value: ', value)
        dispatch(loginThunk(value))
            .unwrap()
            .then(() => {
               
                if(localStorage.getItem("bookingId")){
                    const path = generatePath(PATH.booking, {
                        bookingId: localStorage.getItem("bookingId"),
                      });
                      navigate(path);
                      localStorage.removeItem("bookingId")
                }
                else {
                    toast.success('Đăng nhập thành công!', {
                        position: "top-center",
                        autoClose: 1000,
                    })
                    navigate('/')
                }
                
                    
            })
            .catch((err) => {
                handleError(err)
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-600 text-30 text-white">Đăng nhập</h2>
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
            <div className="flex justify-center items-center">
                <Button
                    className="!w-2/3 !p-[6px] !bg-red-500 !text-white !text-[20px] !mt-20 !rounded-10 hover:brightness-125 !h-auto"
                    htmlType="submit"
                    type="primary"
                    danger
                    loading={isFetchingLogin}
                >
                    Đăng nhập
                </Button>
            </div>
        </form>
    )
}
