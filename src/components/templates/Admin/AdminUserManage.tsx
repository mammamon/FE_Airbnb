import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { Modal, Table } from "antd";
import { PATH, apiInstance } from "constant";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterSchema, RegisterSchemaType, AccountSchema, AccountSchemaType } from "schema";
import { userServices } from "services";
import { useState, useEffect } from "react";
import { handleError, pagination, useSearch, sortFilterTable, editItem, deleteItem } from "utils";

export const AdminUserManage = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset
    } = useForm<RegisterSchemaType>({
        mode: "onChange",
        resolver: zodResolver(RegisterSchema),
    });

    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        reset();
    };

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { keyword, handleSearchChange } = useSearch('users/search');
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = async (item) => {
        try {
            const newItemData = { ...item, ...newData };
            await editItem('users', item.id, newItemData);
        } catch (error) {
            handleError(error);
        }
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


    const fetchUserPagination = async (pageIndex = 1, pageSize = 50) => {
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
            title: 'Name', dataIndex: 'name',
        },
        {
            title: 'Avatar', dataIndex: 'avatar',
        },
        {
            title: 'Email', dataIndex: 'email',
        },
        {
            title: 'Role', dataIndex: 'role',
        },
        {
            title: 'Quản lý', dataIndex: 'role',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record)}>Delete</Button>
                </>
            ),
        },
    ], data);

    useEffect(() => {
        fetchUserPagination();
    }, [keyword]);

    useEffect(() => {
        if (editingUser) {
            reset(editingUser);
        }
    }, [editingUser]);


    const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
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
                role: 'ADMIN'
            };

            await userServices.register(newUser);
            toast.success('Đăng ký thành công!', {
                position: 'top-right',
                autoClose: 1000,
            });

            navigate(PATH.login);
            setIsModalVisible(false);
            reset();
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Thêm quản trị viên
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            selectOptions={[
                                { label: 'Nam', value: true },
                                { label: 'Nữ', value: false }
                            ]}
                            register={register}
                        />
                    </div>
                    <div className="flex">
                        <label className="p-10 w-1/2 text-black">Loại tài khoản:</label>
                        <Input
                            className="mt-16"
                            id="role"
                            name="role"
                            error={errors?.role?.message}
                            selectOptions={[
                                { label: 'Quản trị viên', value: 'ADMIN' },
                                { label: 'Người dùng', value: 'USER' }
                            ]}
                            register={register}
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-2/3 p-10 text-[20px] mt-2"
                        >
                            {editingUser ? 'Cập nhật' : 'Đăng Ký'}
                        </button>
                    </div>
                </form>
            </Modal>
            <Input placeholder="Search" value={keyword} onChange={handleSearchChange} />
            <Table columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 20 }} scroll={{ y: 240 }} />
        </div>
    );
};  