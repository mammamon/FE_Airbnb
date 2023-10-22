import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Avatar } from 'components/ui'
// import { useAuth } from 'hooks'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AccountSchema, AccountSchemaType } from 'schema/AccountSchema'
import { AppDispatch, RootState } from 'store'
import { updateThunk } from 'store/UserStore'

export const AccountInfo = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { user } = useAuth()
  const userLogin = useSelector((state: RootState) => state.userManage.userLogin)
  console.log("userLogin: ", userLogin);
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    mode: 'onChange',
  })  
  const dispatch = useDispatch<AppDispatch>();
  
  const { watch } = useForm();
  console.log('Form state:', watch());
  const onSubmit: SubmitHandler<AccountSchemaType> = (value) => {
    if (userLogin) {
      console.log('UserLogin:', userLogin);
      dispatch(updateThunk({ id: userLogin.id, data: value }));
    }
  }

  useEffect(() => {
    if (userLogin) { 
      setValue('name', userLogin.name); 
      setValue('email', userLogin.email); 
      setValue('password', '');
      setValue('confirmPassword', '');
      setValue('phone', userLogin.phone); 
      setValue('birthday', userLogin.birthday); 
      setValue('gender', userLogin.gender ? 'true' : 'false'); 
    }
  }, [setValue, userLogin]);
  


  return (
    <div className="acountInfoWrapper flex ">
      <div className="w-1/2 flex flex-column items-center">
        <div className="bg-gray-300 rounded-full flex items-center mb-3">
          <Avatar className="cursor-pointer" size={120} icon={<i className="fas fa-user"></i>} onClick={() => fileInputRef.current?.click()} />
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
        </div>
        <h3>cập nhật hình ảnh</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
        <Input
          className="mt-16"
          placeholder="Họ tên"
          id="name"
          name="name"
          error={errors?.name?.message}
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
          type="password"
          className="mt-16"
          placeholder="Mật khẩu"
          id="password"
          name="password"
          error={errors?.password?.message}
          register={register}
        />
        <Input
          type="password"
          className="mt-16"
          placeholder="Nhập lại mật khẩu"
          id="confirmPassword"
          name="confirmPassword"
          error={errors?.confirmPassword?.message}
          register={register}
        />

        <Input
          className="mt-16"
          placeholder="Số điện thoại"
          id="phone"
          name="phone"
          error={errors?.phone?.message}
          register={register}
        />
        <div className="flex">
          <label className="p-10 w-1/2 text-black">Ngày sinh:</label>
          <Input
            type="date"
            className="mt-16"
            placeholder="Ngày sinh"
            id="birthday"
            name="birthday"
            error={errors?.birthday?.message}
            register={register}
          />
        </div>
        <div className="flex">
          <label className="p-10 w-1/2 text-black pt-[10px]">Giới tính:</label>
          <Input
            className="mt-16"
            id="gender"
            name="gender"
            error={errors?.gender?.message}
            register={register}
            selectOptions={[
              { label: 'Nam', value: 'true' },
              { label: 'Nữ', value: 'false' }
            ]}
          />
        </div>
        <div className="flex">
          <label className="p-10 w-1/2 text-black">Loại tài khoản:</label>
          <Input
            className="mt-16"
            id="role"
            name="role"
            register={register}
            selectOptions={[
              { label: 'Người dùng', value: 'USER' },
              { label: 'Quản trị viên', value: 'ADMIN' }
            ]}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-2/3 p-10 text-[20px] mt-2">
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  )
}