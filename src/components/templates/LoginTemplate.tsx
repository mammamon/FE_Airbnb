import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSchema, LoginSchemaType } from "schema";
import { RootState, useAppDispatch } from "store";
import { loginThunk } from "store/AuthStore";
import { handleError } from "utils";

export const LoginTemplate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isFetchingLogin } = useSelector(
    (state: RootState) => state.authManagement
  );

  const onSubmit: SubmitHandler<LoginSchemaType> = (value) => {
    console.log('onsubmit start')
    dispatch(loginThunk(value))
      .unwrap()
      .then(() => {
        toast.success("Đăng nhập thành công!", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate("/");
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h2>Đăng nhập</h2>
        <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
      </div>
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
      <div className="flex justify-center items-center">
        <Button
          className="!w-2/3 !p-[6px] !bg-[#ff385c] !text-white !text-[20px] !mt-[6px] !rounded-10 hover:brightness-125 !h-auto"
          htmlType="submit"
          type="primary"
          danger
          loading={isFetchingLogin}
        >
          Đăng nhập
        </Button>
      </div>
    </form>
  );
};
