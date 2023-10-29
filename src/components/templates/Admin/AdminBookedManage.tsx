import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { Modal, Table, Descriptions } from "antd";
import { apiInstance } from "constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BookedAddSchema, BookedEditSchema, BookedSchemaType } from "schema";
import { useState, useEffect } from "react";
import { handleError, useSearch, sortFilterTable, deleteItem, editItem } from "utils";

export const AdminBookedManage = () => {
    const api = apiInstance({ baseURL: import.meta.env.VITE_API });
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { keyword, handleSearchChange } = useSearch('dat-phong/search');
    const [editingBooked, setEditingBooked] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedBookedDetails, setselectedBookedDetails] = useState(null);
    const [selectedMaNguoiDung, setSelectedMaNguoiDung] = useState(null);
    const [selectedMaPhong, setSelectedMaPhong] = useState(null);

    const handleSelectedMaNguoiDungChange = (value) => {
        setSelectedMaNguoiDung(value);
    };

    const handleSelectedMaPhongChange = (value) => {
        setSelectedMaPhong(value);
    };

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
        resolver: zodResolver(editingBooked ? BookedEditSchema : BookedAddSchema),
    });
    const onSubmit = async (values) => {
        values.maNguoiDung = parseInt(selectedMaNguoiDung);
        values.maPhong = parseInt(selectedMaPhong);
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
        const convertedData = {};
        for (const key in record) {
            convertedData[key] = (typeof record[key] === 'boolean' || typeof record[key] === 'number') ? record[key].toString() : record[key];
        }

        console.log("Editing record:", convertedData);
        setEditingBooked(convertedData);
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
        setEditingBooked(null);
        reset({
            maNguoiDung: "1",
            maPhong: "1",
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
                            value: user.id.toString(),
                        }))}
                        value={selectedMaNguoiDung}
                        onChange={(e) => handleSelectedMaNguoiDungChange(e.target.value)}
                    />
                    <Input
                        className="mt-16"
                        placeholder="Chọn phòng"
                        id="maPhong"
                        name="maPhong"
                        error={errors?.maPhong?.message}
                        register={register}
                        selectOptions={rooms.map(room => ({
                            label: `${room.id}: ${room.tenPhong}`,
                            value: room.id.toString(),
                        }))}
                        value={selectedMaPhong}
                        onChange={(e) => handleSelectedMaPhongChange(e.target.value)}
                    />
                    <div className="flex">
                        <label className="p-10 w-1/2 text-black">Ngày đến:</label>
                        <Input
                            type="date"
                            className="mt-16"
                            placeholder="Ngày sinh"
                            id="ngayDen"
                            name="ngayDen"
                            error={errors?.ngayDen?.message}
                            register={register}
                        />
                    </div>
                    <div className="flex">
                        <label className="p-10 w-1/2 text-black">Ngày đi:</label>
                        <Input
                            type="date"
                            className="mt-16"
                            placeholder="Ngày đi"
                            id="ngayDi"
                            name="ngayDi"
                            error={errors?.ngayDi?.message}
                            register={register}
                        />
                    </div>
                    <div className="w-full px-4  items-center">
                        <label htmlFor="soLuongKhach" className="w-1/3 pb-[14px]">Mô Tả:</label>
                        <Input
                            id="soLuongKhach"
                            name="soLuongKhach"
                            error={errors?.soLuongKhach?.message}
                            register={register}
                        />
                    </div>
                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            className="w-2/5 p-10 text-[20px] mt-2">
                            {editingBooked ? "Cập nhật" : "Thêm"}
                        </button>
                    </div>
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
                            <Descriptions.Item label="ID - Đơn đặt phòng số">{selectedBookedDetails.id}</Descriptions.Item>
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
