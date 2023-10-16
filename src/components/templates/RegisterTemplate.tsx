import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components";
import { PATH } from "constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { authServices } from "services";
import { handleError } from "utils";
import { apiInstance } from "constant";

export const RegisterTemplate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    console.log('onSubmit called');
    const api = apiInstance({
      baseURL: import.meta.env.VITE_API,
    });
    try {
      //tạo id ngẫu nhiên 6 số
      let id = Math.floor(Math.random() * 900000) + 100000;
      const response = await api.get('/users');
      const users = response.data;
      const emailDitto = users.some((user) => user.email === values.email);
      const idDitto = users.some((user) => user.id === id);
      while (idDitto) {
        id = Math.floor(Math.random() * 900000) + 100000;
      }
      if (emailDitto) {
        throw new Error('Email đã tồn tại');
      }
      // tạo object mới chứa id vừa tạo
      const newUser = {
        ...values,
        id,
      };
      // gán newUSer vào gender dạng boolean rồi trả về server
      const newUserBooleanGender = {
        ...newUser,
        gender: newUser.gender,
      };
      await authServices.register(newUserBooleanGender);
      toast.success('Đăng ký thành công!', {
        position: 'top-right',
        autoClose: 1000,
      });
      navigate(PATH.login);
    } catch (err) {
      handleError(err);
    }
    console.log('onSubmit completed');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h2>Đăng ký</h2>
        <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
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
            { label: 'Nam', value: true },
            { label: 'Nữ', value: false }
          ]}
        />
      </div>
      <div className="flex">
        <label className="p-10 w-1/2 text-black">Loại tài khoản:</label>
        <Input
          className="mt-16"
          id="role"
          name="role"
          error={errors?.role?.message}
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
          Đăng Ký
        </button>
      </div>
    </form>
  );
};