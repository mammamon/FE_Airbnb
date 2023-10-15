import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components";
import { PATH } from "constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType } from "schema";
import { authServices } from "services";
import { handleError } from "utils";

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
    console.log("onSubmit function called");
    try {
        await authServices.register(values)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <h2>Đăng ký</h2>
        <img src="../../../public/images/airbnb.svg" className="w-[130px] h-[32px]" />
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
            { label: 'Nam', value: 'm' },
            { label: 'Nữ', value: 'f' }
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
            { label: 'Người dùng', value: 'user' },
            { label: 'Quản trị viên', value: 'admin' }
          ]}
        />
      </div>
      <div className="flex justify-center items-center">
        <button type="submit" className="w-2/3 p-10 text-[20px] mt-2">
          Đăng Ký
        </button>
      </div>
    </form>
  );
};