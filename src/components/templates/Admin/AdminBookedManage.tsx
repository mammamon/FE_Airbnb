import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { Modal, Table, Descriptions } from "antd";
import { apiInstance } from "constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BookedSchema, BookedSchemaType } from "schema";
import { useState, useEffect } from "react";
import { handleError, useSearch, sortFilterTable, deleteItem, editItem } from "utils";

export const AdminBookedManage = () => {
    const api = apiInstance({ baseURL: import.meta.env.VITE_API });
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { keyword, handleSearchChange } = useSearch('dat-phong/search');
    const [editingBooked, seteditingBooked] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedBookedDetails, setselectedBookedDetails] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const bookedResponse = await api.get('/dat-phong');
            setData(bookedResponse.data.content);
            // ...
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data.content);
        } catch (error) {
            handleError(error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await api.get('/phong-thue');
            setRooms(response.data.content);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUsers();
        fetchRooms();
        // eslint-disable-next-line
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookedSchemaType>({
        mode: "onChange",
        resolver: zodResolver(BookedSchema),
    });

    const onSubmit = async (values) => {
        try {
            if (editingBooked) {
                // handle edit
                const updatedLocation = await editItem('dat-phong', editingBooked.id, values);
                console.log("Updated Location:", updatedLocation);
                toast.success('Cập nhật phòng đặt thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();

            } else {
                // handle add
                const response = await api.get('/dat-phong');
                let locations = [];
                if (response.data && typeof response.data === 'object') {
                    if (Array.isArray(response.data)) {
                        locations = response.data;
                    } else {
                        locations.push(response.data);
                    }
                } else {
                    throw new Error('Data không hợp lệ');
                }

                const locationDitto = locations.some((location) => location.tenViTri === values.tenViTri);
                if (locationDitto) {
                    throw new Error('phòng đặt đã tồn tại');
                }

                const addedLocation = await api.get('dat-phong', { params: values });
                toast.success('thêm đơn đặt phòng thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();
                console.log("Added Location ID:", addedLocation.data.id);
            }
        } catch (err) {
            handleError(err);
        }
    };



    const handleEditBooked = (record) => {
        console.log("Editing record:", record);
        seteditingBooked(record);
        showModal();
    };

    const handleDeleteBooked = async (item) => {
        if (window.confirm('Bạn muốn xóa phòng đặt này?')) {
            try {
                await deleteItem('dat-phong', item.id);
                toast.success('Xóa phòng đặt thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });
            } catch (error) {
                handleError(error);
            }
        }
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        seteditingBooked(null);
        reset({
        maNguoiDung: 1,
        maPhong: 1,
        });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showDetailsModal = (location) => {
        setselectedBookedDetails(location);
        setIsDetailsModalVisible(true);
    };

    const handleDetailsModalCancel = () => {
        setIsDetailsModalVisible(false);
        setselectedBookedDetails(null);
    };



    const columns = data ? sortFilterTable([
        {
            title: 'ID', dataIndex: 'id', width: 100,
        },
        {
            title: 'Mã Người Dùng', dataIndex: 'maNguoiDung',
        },
        {
            title: 'Mã Phòng', dataIndex: 'maPhong',
        },
        {
            title: 'Ngày Đến', dataIndex: 'ngayDen',
        },
        {
            title: 'Ngày Đi', dataIndex: 'ngayDi',
        },
        {
            title: 'Số Lượng Khách', dataIndex: 'soLuongKhach',
        },
        {
            title: 'Hình Ảnh', dataIndex: 'hinhAnh', width: 180,
            className: 'text-center',
            render: (hinhAnh) => (
                <div className="flex justify-center">
                    <img src={hinhAnh || '../../images/no-image.png'} alt="Location" width={80} height={80} />
                </div>
            ),
        },
        {
            title: 'Quản Lý', width: 300,
            className: 'text-center',
            render: (_, record) => (
                <>
                    <Button
                        className="me-4"
                        onClick={() => showDetailsModal(record)}
                    >
                        Thông tin chi tiết
                    </Button>
                    <Button
                        className="me-4"
                        onClick={() => handleEditBooked(record)}
                        disabled={record.id <= 10}
                    >
                        Sửa
                    </Button>
                    <Button
                        onClick={() => handleDeleteBooked(record)}
                        disabled={record.id <= 10}
                    >
                        Xóa
                    </Button>
                </>
            ),
        }


    ], data) : [];

    useEffect(() => {
        if (editingBooked) {
            reset({
                ...editingBooked,
            });
        }
    }, [editingBooked, reset]);


    return (
        <div>
            <Button className="mb-3 !p-10 !h-[48px]" type="primary" onClick={showModal}>
                thêm đơn đặt phòng
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex items-center justify-between">
                    <h2>{editingBooked ? "Cập nhật đặt phòng" : "Thêm đơn đặt phòng"}</h2>
                    <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className="mt-16"
                        placeholder="Chọn người dùng"
                        id="maNguoiDung"
                        name="maNguoiDung"
                        error={errors?.maNguoiDung?.message}
                        register={register}
                        selectOptions={users.map(user => ({
                            label: `${user.id}: ${user.name}`,
                            value: user.id,
                        }))}
                    />
                    <Input
                        className="mt-16"
                        placeholder="Chọn phòng"
                        id="maPhong"
                        name="maPhong"
                        error={errors?.maPhong?.message}
                        register={register}
                        selectOptions={rooms.map(room => ({
                            label: `ID ${room.id}: ${room.tenPhong}`,
                            value: room.id,
                        }))}
                    />
                    {/* ... rest of your form fields */}
                </form>
            </Modal>
            <Modal
                title="Thông tin chi tiết"
                visible={isDetailsModalVisible}
                onCancel={handleDetailsModalCancel}
                footer={null}
                className="text-center"
            >
                {selectedBookedDetails && (
                    <div className="detailsModal flex flex-column justify-center items-center">
                        <img
                            src={selectedBookedDetails.hinhAnh || '../../../../images/no-image.jpg'}
                            style={{ width: '90%', height: '240px' }}
                            alt="phòng đặt"
                            className="mb-3"
                        />
                        <Descriptions column={2}>
                            <Descriptions.Item label="Tên phòng đặt">{selectedBookedDetails.tenViTri}</Descriptions.Item>
                            <Descriptions.Item label="ID - Mã phòng đặt">{selectedBookedDetails.id}</Descriptions.Item>
                            <Descriptions.Item label="Tỉnh Thành">{selectedBookedDetails.tinhThanh}</Descriptions.Item>
                            <Descriptions.Item label="Quốc Gia">{selectedBookedDetails.quocGia}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
            <div className="searchTableWrapper flex pb-3 w-full justify-center">
                <input className="p-2 rounded-10 w-2/3 searchInputAdmin" placeholder="Nhập tên phòng đặt" value={keyword} onChange={handleSearchChange} />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                scroll={{ y: 460 }}
            />
        </div>
    );
};
