import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { Modal, Table, Avatar } from "antd";
import { apiInstance } from "constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType, AccountSchema, AccountSchemaType } from "schema";
import { userServices } from "services";
import { useState, useEffect } from "react";
import { handleError, pagination, useSearch, sortFilterTable, editItem, deleteItem, formatBirthday, formatRole, isValidUrl } from "utils";

export const AdminLocationManage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { keyword, handleSearchChange } = useSearch('users/search');
    const [editingUser, setEditingUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const renderAvatar = (user) => {
        const avatarUrl = user.avatar;
        if (isValidUrl(avatarUrl)) {
            return (
                <Avatar
                    src={avatarUrl}
                    style={{ width: 60, height: 60 }}
                />
            );
        } else {
            const defaultAvatarUrl = '../../../../images/no-avatar.png';
            return (
                <Avatar
                    src={defaultAvatarUrl}
                    style={{ width: 60, height: 60 }}
                />
            );
        }
    };


    //register Form
    const {
        handleSubmit: handleRegisterSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<RegisterSchemaType>({
        mode: "onChange",
        resolver: zodResolver(RegisterSchema),
    });

    const handleRegister: SubmitHandler<RegisterSchemaType> = async (values) => {
        console.log("Form values on submit:", values);
        const api = apiInstance({
            baseURL: import.meta.env.VITE_API,
        });

        try {
            const response = await api.get('/users');
            let users = [];
            if (response.data && typeof response.data === 'object') {
                if (Array.isArray(response.data)) {
                    users = response.data;
                } else {
                    users.push(response.data);
                }
            } else {
                throw new Error('user data không hợp lệ');
            }

            const emailDitto = users.some((user) => user.email === values.email);
            if (emailDitto) {
                throw new Error('Email đã tồn tại');
            }

            const newUser = {
                ...values,
                gender: values.gender === 'true' ? 'true' : 'false',
                role: 'ADMIN',
            };

            await userServices.register(newUser);
            toast.success('Đăng ký thành công!', {
                position: 'top-center',
                autoClose: 1000,
            });

            setIsModalVisible(false);
            reset();
            resetEdit();
        } catch (err) {
            handleError(err);
        }
    };

    const {
        handleSubmit: handleEditSubmit,
        register: registerEdit,
        formState: { errors: errorsEdit },
        reset: resetEdit,
    } = useForm<AccountSchemaType>({
        mode: "onChange",
        resolver: zodResolver(AccountSchema),
    });

    //edit form
    const handleEdit: SubmitHandler<AccountSchemaType> = async (values) => {
        console.log("Form values:", values);
        try {
            const updatedUser = await editItem('users', editingUser.id, values);
            console.log("Updated user:", updatedUser);
            toast.success('Cập nhật thành công!', {
                position: 'top-center',
                autoClose: 1000,
            });
            setIsModalVisible(false);
            reset();
            resetEdit();
            fetchUserPagination();
        } catch (err) {
            handleError(err);
        }
    };




    const handleEditUser = (record) => {
        console.log("Editing record:", record);
        showModal();
        setEditingUser(record);
    };

    const handleDelete = async (item) => {
        if (window.confirm('Bạn muốn xóa người dùng này?')) {
            try {
                await deleteItem('users', item.id);
                fetchUserPagination();
            } catch (error) {
                handleError(error);
            }
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingUser(null);
        reset({
            name: '',
            email: '',
            password: '',
            phone: '',
            birthday: '',
        });
        resetEdit({
            name: '',
            email: '',
            password: '',
            phone: '',
            birthday: '',
            gender: '',
        });
    };
    const fetchUserPagination = async (pageIndex = 1, pageSize = 140) => {
        setLoading(true);
        try {
            const response = await pagination('users/phan-trang-tim-kiem', pageIndex, pageSize, keyword);
            setData(response.data.content.data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const columns = sortFilterTable([
        {
            title: 'ID', dataIndex: 'id', width: 100,
        },
        {
            title: 'Tên', dataIndex: 'name',
        },
        {
            title: 'Email', dataIndex: 'email',
        },
        {
            title: 'Ảnh đại diện', dataIndex: 'avatar', width: 180,
            render: (avatar, record) => renderAvatar(record),
        },
        {
            title: 'Loại tài khoản', dataIndex: 'role', width: 180,
        },
        {
            title: 'Quản lý', width: 180,
            render: (_, record) => (
                <>
                    <Button className="me-4" onClick={() => handleEditUser(record)}>Sửa</Button>
                    <Button onClick={() => handleDelete(record)}>Xóa</Button>
                </>
            ),
        },
    ], data);

    useEffect(() => {
        fetchUserPagination();
        // eslint-disable-next-line
    }, [keyword]);

    useEffect(() => {
        if (editingUser) {
            resetEdit({
                ...editingUser,
                gender: String(editingUser.gender),
                birthday: formatBirthday(editingUser.birthday),
                role: formatRole(editingUser.role),
            });
        }
    }, [editingUser, resetEdit]);


    return (
        <div>
            <Button className="mb-3 !p-10 !h-[48px]" type="primary" onClick={showModal}>
                Thêm quản trị viên
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {editingUser ? (
                    <form onSubmit={handleEditSubmit(handleEdit)}>
                        <div className="flex items-center justify-between">
                            <h2>Đăng ký</h2>
                            <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
                        </div>
                        <Input
                            className="mt-16"
                            placeholder="Họ tên"
                            id="name"
                            name="name"
                            error={errorsEdit?.name?.message}
                            register={registerEdit}
                        />
                        <Input
                            className="mt-16"
                            placeholder="Email"
                            id="email"
                            name="email"
                            error={errorsEdit?.email?.message}
                            register={registerEdit}
                        />
                        <Input
                            type="password"
                            className="mt-16"
                            placeholder="Mật khẩu"
                            id="password"
                            name="password"
                            error={errorsEdit?.password?.message}
                            register={registerEdit}
                        />
                        <Input
                            type="password"
                            className="mt-16"
                            placeholder="Nhập lại mật khẩu"
                            id="confirmPassword"
                            name="confirmPassword"
                            error={errorsEdit?.confirmPassword?.message}
                            register={registerEdit}
                        />

                        <Input
                            className="mt-16"
                            placeholder="Số điện thoại"
                            id="phone"
                            name="phone"
                            error={errorsEdit?.phone?.message}
                            register={registerEdit}
                        />
                        <div className="flex">
                            <label className="p-10 w-1/2 text-black">Ngày sinh:</label>
                            <Input
                                type="date"
                                className="mt-16"
                                placeholder="Ngày sinh"
                                id="birthday"
                                name="birthday"
                                error={errorsEdit?.birthday?.message}
                                register={registerEdit}
                            />
                        </div>
                        <div className="flex">
                            <label className="p-10 w-1/2 text-black pt-[10px]">Giới tính:</label>
                            <Input
                                className="mt-16"
                                id="gender"
                                name="gender"
                                error={errorsEdit?.gender?.message}
                                register={registerEdit}
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
                                error={errorsEdit?.role?.message}
                                register={registerEdit}
                                selectOptions={[
                                    { label: 'Quản trị viên', value: 'ADMIN' },
                                    { label: 'Người dùng', value: 'USER' }
                                ]}
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-2/3 p-10 text-[20px] mt-2">
                                Cập nhật
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit(handleRegister)}>
                        <div className="flex items-center justify-between">
                            <h2>Thêm Admin</h2>
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
                                    { label: 'Quản trị viên', value: 'ADMIN' },
                                ]}
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-2/3 p-10 text-[20px] mt-2">
                                Thêm Admin
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
            <div className="searchTableWrapper flex pb-3 w-full justify-center">
                <input className="p-2 rounded-10 w-2/3 searchInputAdmin" placeholder="Nhập họ tên" value={keyword} onChange={handleSearchChange} />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 20 }}
                scroll={{ y: 460 }}
            />
        </div>
    );
};
