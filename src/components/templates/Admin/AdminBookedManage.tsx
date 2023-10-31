import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { Input, Button } from "components";
import { Modal, Table, Descriptions } from "antd";
import { apiInstance } from "constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BookedAddSchema, BookedEditSchema, BookedSchemaType } from "schema";
import { useState, useEffect } from "react";
import { handleError, sortFilterTable, deleteItem, editItem, formatDate, tongTienDisplay } from "utils";

export const AdminBookedManage = () => {
    const api = apiInstance({ baseURL: import.meta.env.VITE_API });
    const [data, setData] = useState([]);
    const [users, setUsers] = useState<{ id: number, name: string }[]>([]);
    const [rooms, setRooms] = useState<{ id: number, tenPhong: string, giaTien: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingBooked, setEditingBooked] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedBookedDetails, setselectedBookedDetails] = useState(null);
    const [selectedMaNguoiDung, setSelectedMaNguoiDung] = useState(null);
    const [selectedMaPhong, setSelectedMaPhong] = useState(null);

    const findMatchingUserAndRoom = (dataItem) => {
        const user = users.find(user => user.id === dataItem.maNguoiDung);
        const room = rooms.find(room => room.id === dataItem.maPhong);
        return { user, room };
    };

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

    const registerNumber = (name) => {
        return {
            ...register(name, {
                setValueAs: value => parseFloat(value)
            })
        };
    };

    const onSubmit = async (values) => {
        try {
            if (editingBooked) {
                // handle edit
                const updatedBooked = await editItem('dat-phong', editingBooked.id, values);
                console.log("Updated :", updatedBooked);
                toast.success('Cập nhật phòng đặt thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();

            } else {
                // handle add
                const response = await api.get('/dat-phong');
                let Booked = [];
                if (response.data && typeof response.data === 'object') {
                    if (Array.isArray(response.data)) {
                        Booked = response.data;
                    } else {
                        Booked.push(response.data);
                    }
                } else {
                    throw new Error('Data không hợp lệ');
                }

                const addedBooked = await api.get('dat-phong', { params: values });
                toast.success('thêm lịch đặt phòng thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();
                console.log("Added ID:", addedBooked.data.id);
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
            soLuongKhach: 1,
            ngayDen: moment().format('YYYY-MM-DD'),
            ngayDi: moment().format('YYYY-MM-DD'),
        });
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const showDetailsModal = (record) => {
        const { user, room } = findMatchingUserAndRoom(record);
        setselectedBookedDetails({ ...record, user, room });
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
            title: 'Mã người dùng', dataIndex: 'maNguoiDung',
            className: 'text-center',

        },
        {
            title: 'Mã phòng', dataIndex: 'maPhong',
            className: 'text-center',

        },
        {
            title: 'Ngày đến', dataIndex: 'ngayDen',
            render: (text) => moment(text).format('DD/MM/YYYY')

        },
        {
            title: 'Ngày đi', dataIndex: 'ngayDi',
            render: (text) => moment(text).format('DD/MM/YYYY')

        },
        {
            title: 'Số lượng khách', dataIndex: 'soLuongKhach',
            className: 'text-center',
        },
        {
            title: 'Quản Lý', width: 320,
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
                    >
                        Sửa
                    </Button>
                    <Button
                        onClick={() => handleDeleteBooked(record)}
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
                ngayDen: formatDate(editingBooked.ngayDen),
                ngayDi: formatDate(editingBooked.ngayDi),
            });
        }
    }, [editingBooked, reset]);


    return (
        <div>
            <Button className="mb-3 !p-10 !h-[48px]" type="primary" onClick={showModal}>
                thêm lịch đặt phòng
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex items-center justify-between px-4">
                    <h2>{editingBooked ? "Sửa lịch đặt phòng" : "Thêm lịch đặt phòng"}</h2>
                    <img src="../../../images/airbnb.svg" className="w-[100px] h-[25px]" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                    <div className="px-4">
                        <label htmlFor="maNguoiDung">Người đặt phòng: </label>
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
                    </div>
                    <div className="px-4">
                        <label htmlFor="maPhong">Chọn phòng đặt: </label>
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
                    </div>
                    <div className="flex px-3">
                        <label className="p-10 w-2/5 text-black">Ngày đến:</label>
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
                    <div className="flex px-3">
                        <label className="p-10 w-2/5 text-black">Ngày đi:</label>
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
                    <div className="px-4 flex justify-between w-3/4">
                        <label className="me-[58px]" htmlFor="soLuongKhach">Số lượng khách:</label>
                        <Input
                            id="soLuongKhach"
                            name="soLuongKhach"
                            type='number'
                            error={errors?.soLuongKhach?.message}
                            register={registerNumber}
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
                visible={isDetailsModalVisible}
                onCancel={handleDetailsModalCancel}
                footer={null}
                className="text-center"
            >
                {selectedBookedDetails && (
                    <div className="detailsModal flex flex-column justify-center items-center">
                        {(() => {
                            const { user, room } = findMatchingUserAndRoom(selectedBookedDetails);
                            return (
                                <div>
                                    <h2 className="!text-x2l">Lịch đặt phòng số: {selectedBookedDetails.id}</h2>
                                    <Descriptions>
                                        <Descriptions.Item label="Tên phòng">{room && room.tenPhong}</Descriptions.Item>
                                    </Descriptions>
                                    <Descriptions column={2}>
                                        <Descriptions.Item label="Người đặt phòng">{user && user.name}</Descriptions.Item>
                                        <Descriptions.Item label="Số lượng khách">{selectedBookedDetails.soLuongKhach}</Descriptions.Item>
                                        <Descriptions.Item label="Ngày đến">{moment(selectedBookedDetails.ngayDen).format('DD/MM/YYYY')}</Descriptions.Item>
                                        <Descriptions.Item label="Ngày đi">{moment(selectedBookedDetails.ngayDi).format('DD/MM/YYYY')}</Descriptions.Item>
                                        <Descriptions.Item label="Giá tiền">${room && room.giaTien}/ đêm</Descriptions.Item>
                                        <Descriptions.Item label="Tổng tiền">${tongTienDisplay(room.giaTien, selectedBookedDetails.ngayDen, selectedBookedDetails.ngayDi)}</Descriptions.Item>
                                    </Descriptions>
                                </div>

                            );
                        })()}
                    </div>
                )}

            </Modal>

            <div className="searchTableWrapper flex pb-3 w-full justify-center">
                <input className="p-2 rounded-10 w-2/3 searchInputAdmin" placeholder="Nhập đơn đặt phòng" />
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
