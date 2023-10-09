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
    try {
      await authServices.register(values);
      toast.success("Đăng ký thành công!", {
        position: "top-right",
        autoClose: 1000,
      });
      navigate(PATH.login);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-600 text-30">Đăng ký</h2>
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

      {/* <Input
        type="date"
        className="mt-16"
        placeholder="Ngày sinh nhật"
        id="birthday"
        name="birthday"
        error={errors?.birthday?.message}
        register={register}
      />

      <Input
        className="mt-16"
        placeholder="Giới tính"
        id="gene"
        name="gene"
        error={errors?.gene?.message}
        register={register}
      /> */}

      <div className="flex justify-center items-center">
        <button className="w-2/3 p-10 bg-red-500 text-white text-[20px] mt-20 rounded-10 hover:brightness-125">
          Đăng Ký
        </button>
      </div>
    </form>
  );
};
