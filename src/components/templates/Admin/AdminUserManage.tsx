import { useState } from 'react';
import { Button, Input, Table, Form, Modal } from 'antd';
import { RegisterSchema, RegisterSchemaType } from 'schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userServices } from 'services';
import { apiInstance } from 'constant';

export const AdminUserManage = () => {
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SchemaType>({
        mode: "onChange",
        resolver: zodResolver(AdminSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        const api = apiInstance({
            baseURL: import.meta.env.VITE_API,
        });
        try {
            const adminData = { ...data, role: 'ADMIN' };
            await userServices.register(adminData);
            setVisible(false);
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];

    const data = [];

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                Thêm quản trị viên
            </Button>
            <Modal
                title="Thêm quản trị viên"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Form.Item label="Name" help={errors.name?.message}>
                        <Input {...register('name')} />
                    </Form.Item>
                    <Form.Item label="Email" help={errors.email?.message}>
                        <Input {...register('email')} />
                    </Form.Item>
                    {/* Add more fields as needed */}
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-2/3 p-10 text-[20px] mt-2">
                            Đăng Ký
                        </button>
                    </div>
                </Form>
            </Modal>
            <Input.Search style={{ width: 200 }} />
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
        </div>
    );
};
