import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Avatar } from 'components/ui'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { AccountSchema, AccountSchemaType } from 'schema/AccountSchema'
import { AppDispatch, RootState } from 'store'
import { updateThunk } from 'store/UserStore'
import { userServices } from 'services/userServices'
import { UserOutlined } from '@ant-design/icons'
import { handleError } from 'utils'

export const AccountInfo = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userLogin = useSelector((state: RootState) => state.userManage.userLogin)
  // console.log("userLogin: ", userLogin);
  const {
    reset,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    mode: 'onChange',
  })
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<AccountSchemaType> = async (value) => {
    try {
      if (userLogin?.user) {
        const fileInput = fileInputRef.current;
        if (fileInput?.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const formData = new FormData();
          formData.append('avatar', file);
          const imageUrl = await userServices.uploadAvatar(formData);
          //avatar upload thất bại = avatar hiện tại
          if (imageUrl) {
            value.avatar = imageUrl;
          } else {
            value.avatar = userLogin.user.avatar;
          }
        }
        await dispatch(updateThunk({ id: userLogin.user.id, data: value }));
        toast.success('Cập nhật thành công', {
          position: 'top-center',
          autoClose: 800,
        });
      }
    } catch (err) {
      toast.error('Cập nhật thất bại', {
        position: 'top-center',
        autoClose: 800,
      });
      console.error(err);
    }
  };




  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        try {
          const imageUrl = await userServices.uploadAvatar(file);
          setValue('avatar', imageUrl);
          toast.success('Avatar upload thành công!', {
            position: 'top-center',
            autoClose: 800,
          });
        } catch (err) {
          setValue('avatar', '');
          toast.error('Avatar Upload thất bại', {
            position: 'top-center',
            autoClose: 800,
          });
          console.error(err);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };




  useEffect(() => {
    if (userLogin?.user) {
      reset({
        name: userLogin.user.name,
        email: userLogin.user.email,
        phone: userLogin.user.phone,
        birthday: userLogin.user.birthday,
        gender: userLogin.user.gender === undefined ? undefined : userLogin.user.gender.toString(),
        role: userLogin.user.role,
      });
    }
  }, [reset, userLogin]);

  return (
    <div className="acountInfoWrapper flex justify-center mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className='md:w-full lg:w-1/2'>
        <div className="bg-gray rounded-full flex flex-column items-center justify-center mb-3">
          <Avatar
            className="cursor-pointer"
            size={150}
            onClick={() => fileInputRef.current?.click()}
            src={userLogin?.user.avatar}
            icon={!userLogin?.user.avatar && <UserOutlined />}
          >
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
            id="avatar"
            name="avatar"
          />
        </div>
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
            disabled={true}
            selectOptions={[
              { label: 'Người dùng', value: 'USER' },
              { label: 'Quản trị viên', value: 'ADMIN' }
            ]}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="w-1/3 p-10 text-[20px] mt-2">
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  )
}