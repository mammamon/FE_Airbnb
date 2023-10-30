import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { Modal, Table, Descriptions } from "antd";
import { apiInstance } from "constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RoomSchema, RoomSchemaType } from "schema";
import { useState, useEffect } from "react";
import { handleError, pagination, useSearch, sortFilterTable, deleteItem, editItem, uploadFile } from "utils";

export const AdminRoomManage = () => {
    const api = apiInstance({ baseURL: import.meta.env.VITE_API });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { keyword, handleSearchChange } = useSearch('vi-tri/search');
    const [editingRoom, setEditingRoom] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const findLocationByMaViTri = (maViTri) => {
        return locations.find(location => location.id === maViTri);
    };

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await api.get('/vi-tri');
            setLocations(response.data.content);
        };

        fetchLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const locationDisplay = (maViTri) => {
        const location = locations.find(location => location.id === maViTri);
        return location ? `${location.tenViTri}, ${location.tinhThanh}` : '';
    };


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<RoomSchemaType>({
        mode: "onChange",
        resolver: zodResolver(RoomSchema),
    });

    const registerNumber = (name) => {
        return {
            ...register(name, {
                setValueAs: value => parseFloat(value)
            })
        };
    };

    const onSubmit = async (values) => {
        //đổi mã vị trí qua số
        values.maViTri = parseInt(values.maViTri);
        try {
            if (editingRoom) {
                // handle edit
                const updatedRoom = await editItem('phong-thue', editingRoom.id, values);
                console.log("Updated Room:", updatedRoom);
                toast.success('Cập nhật thông tin phòng thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();
                fetchRoomPagination();

                // Upload file
                const fileInput = document.querySelector('#hinhAnh') as HTMLInputElement;
                if (fileInput.files && fileInput.files.length > 0) {
                    const imageUrl = await uploadFile('/phong-thue/upload-hinh-phong', editingRoom.id, fileInput.files[0]);
                    setValue('hinhAnh', imageUrl);
                }
            } else {
                // handle add
                const response = await api.get('/phong-thue');
                let Rooms = [];
                if (response.data && typeof response.data === 'object') {
                    if (Array.isArray(response.data)) {
                        Rooms = response.data;
                    } else {
                        Rooms.push(response.data);
                    }
                } else {
                    throw new Error('Data không hợp lệ');
                }

                const addedRoom = await api.get('phong-thue', { params: values });
                toast.success('thêm phòng thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();
                console.log("Added Room ID:", addedRoom.data.id);
            }
        } catch (err) {
            handleError(err);
        }
    };




    const handleEditRoom = (record) => {
        const convertedData = {};
        for (const key in record) {
            convertedData[key] = (typeof record[key] === 'boolean' || typeof record[key] === 'number') ? record[key].toString() : record[key];
        }

        console.log("Editing record:", convertedData);
        setEditingRoom(convertedData);
        showModal();
    };


    const handleDeleteRoom = async (item) => {
        if (window.confirm('Bạn muốn xóa phòng này này?')) {
            try {
                await deleteItem('vi-tri', item.id);
                fetchRoomPagination();
                toast.success('Xóa phòng thành công!', {
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
        setEditingRoom(null);
        reset({
            tenPhong: '',
            khach: 0,
            phongNgu: 0,
            giuong: 0,
            phongTam: 0,
            moTa: '',
            giaTien: 0,
            mayGiat: 'false',
            banLa: 'false',
            tivi: 'false',
            dieuHoa: 'false',
            wifi: 'false',
            bep: 'false',
            doXe: 'false',
            hoBoi: 'false',
            banUi: 'false',
            hinhAnh: '',
        });
    };



    const onFileChange = async (event, maViTri) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await api.post(`/phong-thue/upload-hinh-phong?maPhong=${maViTri}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = response.data.content.hinhAnh;
            setValue('hinhAnh', imageUrl);
        } catch (err) {
            handleError(err);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showDetailsModal = (Room) => {
        setSelectedRoomDetails(Room);
        if (Room && Room.maViTri) {
            const location = findLocationByMaViTri(Room.maViTri);
            setSelectedLocation(location);
        }
        setIsDetailsModalVisible(true);
    };

    const handleDetailsModalCancel = () => {
        setIsDetailsModalVisible(false);
        setSelectedRoomDetails(null);
    };

    const fetchRoomPagination = async (pageIndex = 1, pageSize = 100) => {
        setLoading(true);
        try {
            const response = await pagination('phong-thue/phan-trang-tim-kiem', pageIndex, pageSize, keyword);
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
            title: 'Vị Trí', dataIndex: 'maViTri', width: 120,
            render: (maViTri) => (
                <div>{locationDisplay(maViTri)}</div>
            ),
        },
        {
            title: 'Tên Phòng', dataIndex: 'tenPhong',
            className: 'text-center',
            render: (_, record) => (
                <div className="flex flex-column items-center">
                    <h3 className="font-medium text-[#ff385c] capitalize">{record.tenPhong}</h3>
                    <img src={record.hinhAnh || '../../images/no-image.png'} alt="Room" width={300} height={400} />
                </div>
            ),
        },
        {
            title: 'Mô Tả', dataIndex: 'moTa',
            className: 'text-center',
        },

        {
            title: 'Giá Tiền', dataIndex: 'giaTien', width: 150,
            className: 'text-center',
            render: (giaTien: number) => (
                <div className="text-center text-[#333] text-xl">${giaTien}</div>
            ),
        },

        {
            title: 'Quản Lý', width: 200,
            className: 'text-center',
            render: (_, record) => (
                <>
                    <div>
                        <Button
                            className="mb-3  w-[164px]"
                            onClick={() => showDetailsModal(record)}
                        >
                            Thông tin chi tiết
                        </Button>
                    </div>
                    <div>
                        <Button
                            className="me-4 w-[80px]"
                            onClick={() => handleEditRoom(record)}
                        // disabled={record.id <= 21}
                        >
                            Sửa
                        </Button>
                        <Button
                            className="w-[80px]"
                            onClick={() => handleDeleteRoom(record)}
                        // disabled={record.id <= 21}
                        >
                            Xóa
                        </Button>
                    </div>
                </>
            ),
        }

    ], data);

    useEffect(() => {
        fetchRoomPagination();
        // eslint-disable-next-line
    }, [keyword]);

    useEffect(() => {
        if (editingRoom) {
            reset({
                ...editingRoom,
            });
        }
    }, [editingRoom, reset]);


    return (
        <div>
            <Button className="mb-3 !p-10 !h-[48px]" type="primary" onClick={showModal}>
                thêm phòng
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex items-center justify-between">
                    <h2>{editingRoom ? "Cập nhật phòng" : "thêm phòng mới"}</h2>
                    <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">


                    <div className="w-full px-4 mt-4 flex items-center">
                        <Input
                            id="maViTri"
                            name="maViTri"
                            error={errors?.maViTri?.message}
                            register={register}
                            selectOptions={locations.map(location => ({
                                label: location.tenViTri,
                                value: location.id,
                            }))}
                        />

                        <label htmlFor="tenPhong" className="w-1/3 pb-[14px]">Tên Phòng:</label>
                        <Input
                            id="tenPhong"
                            name="tenPhong"
                            error={errors?.tenPhong?.message}
                            register={register}
                        />
                    </div>

                    <div className="w-1/3 px-4 ">
                        <label htmlFor="khach">Số Khách:</label>
                        <Input
                            id="khach"
                            name="khach"
                            type='number'
                            error={errors?.khach?.message}
                            register={registerNumber}
                        />
                    </div>

                    <div className="w-1/3 px-4 ">
                        <label htmlFor="phongNgu">Số Phòng Ngủ:</label>
                        <Input
                            id="phongNgu"
                            name="phongNgu"
                            type='number'
                            error={errors?.phongNgu?.message}
                            register={registerNumber}

                        />
                    </div>

                    <div className="w-1/3 px-4 ">
                        <label htmlFor="giuong">Số Giường:</label>
                        <Input
                            id="giuong"
                            name="giuong"
                            type='number'
                            error={errors?.giuong?.message}
                            register={registerNumber}
                        />
                    </div>

                    <div className="w-1/3 px-4 ">
                        <label htmlFor="phongTam">Số Phòng Tắm:</label>
                        <Input
                            id="phongTam"
                            name="phongTam"
                            type='number'
                            error={errors?.phongTam?.message}
                            register={registerNumber}
                        />
                    </div>
                    <div className="w-1/3 px-4 ">
                        <label htmlFor="giaTien">Giá Tiền:</label>
                        <Input
                            id="giaTien"
                            name="giaTien"
                            type='number'
                            error={errors?.giaTien?.message}
                            register={registerNumber}
                        />
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-1/3 px-4 ">
                            <label htmlFor="mayGiat">Máy Giặt:</label>
                            <Input
                                id="mayGiat"
                                name="mayGiat"
                                error={errors?.mayGiat?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="banLa">Bàn Là:</label>
                            <Input
                                id="banLa"
                                name="banLa"
                                error={errors?.banLa?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="tivi">TiVi:</label>
                            <Input
                                id="tivi"
                                name="tivi"
                                error={errors?.tivi?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="dieuHoa">Điều Hòa:</label>
                            <Input
                                id="dieuHoa"
                                name="dieuHoa"
                                error={errors?.dieuHoa?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="wifi">Wifi:</label>
                            <Input
                                id="wifi"
                                name="wifi"
                                error={errors?.wifi?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="bep">Bếp:</label>
                            <Input
                                id="bep"
                                name="bep"
                                error={errors?.bep?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="doXe">Đỗ Xe:</label>
                            <Input
                                id="doXe"
                                name="doXe"
                                error={errors?.doXe?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="hoBoi">Hồ Bơi:</label>
                            <Input
                                id="hoBoi"
                                name="hoBoi"
                                error={errors?.hoBoi?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="w-1/3 px-4 ">
                            <label htmlFor="banUi">Bàn Ủi:</label>
                            <Input
                                id="banUi"
                                name="banUi"
                                error={errors?.banUi?.message}
                                register={register}
                                selectOptions={[
                                    { label: 'Có', value: 'true' },
                                    { label: 'Không', value: 'false' }
                                ]}
                            />
                        </div>
                    </div>

                    {editingRoom && (
                        <div className="flex flex-column items-center w-full px-4">
                            <label htmlFor="hinhAnh">Url ảnh hiện tại:</label>
                            <Input
                                className=""
                                placeholder="Hình ảnh"
                                disabled={true}
                                id="hinhAnh"
                                name="hinhAnh"
                                register={register}
                            />
                            <h3 className="mb-3">Chọn ảnh khác (tải lên)</h3>
                            <Input type="file" onChange={(event) => onFileChange(event, editingRoom.id)} />
                        </div>
                    )}
                    <div className="w-full px-4  items-center">
                        <label htmlFor="moTa" className="w-1/3 pb-[14px]">Mô Tả:</label>
                        <Input
                            id="moTa"
                            name="moTa"
                            error={errors?.moTa?.message}
                            register={register}
                        />
                    </div>
                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            className="w-2/5 p-10 text-[20px] mt-2">
                            {editingRoom ? "Cập nhật phòng" : "Thêm phòng"}
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
                {selectedRoomDetails && selectedLocation && (
                    <div className="detailsModal flex flex-column justify-center items-center">
                        <h2 className="!text-2xl">{selectedRoomDetails.tenPhong}</h2>
                        <h3 className="mb-1">Vị trí: {selectedLocation ? `${selectedLocation.tenViTri}, ${selectedLocation.tinhThanh}, ${selectedLocation.quocGia}` : 'N/A'}</h3>
                        <img
                            src={selectedRoomDetails.hinhAnh || '../../../../images/no-image.jpg'}
                            style={{ width: '90%', height: '240px' }}
                            alt="phòng"
                            className="mb-3"
                        />
                        <p className="text-[#333] text-2xl mb-3">${selectedRoomDetails.giaTien}/ngày</p>
                        <Descriptions column={3}>
                            <Descriptions.Item label="ID - Mã phòng">{selectedRoomDetails.id}</Descriptions.Item>
                            <Descriptions.Item label="Số Khách">{selectedRoomDetails.khach}</Descriptions.Item>
                            <Descriptions.Item label="Số Phòng Ngủ">{selectedRoomDetails.phongNgu}</Descriptions.Item>
                            <Descriptions.Item label="Số Giường">{selectedRoomDetails.giuong}</Descriptions.Item>
                            <Descriptions.Item label="Số Phòng Tắm">{selectedRoomDetails.phongTam}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions>
                            <Descriptions.Item label="Máy Giặt">
                                {selectedRoomDetails.mayGiat ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Bàn Là">
                                {selectedRoomDetails.banLa ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="TiVi">
                                {selectedRoomDetails.tivi ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Điều Hòa">
                                {selectedRoomDetails.dieuHoa ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Wifi">
                                {selectedRoomDetails.wifi ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Bếp">
                                {selectedRoomDetails.bep ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Đỗ Xe">
                                {selectedRoomDetails.doXe ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Hồ Bơi">
                                {selectedRoomDetails.hoBoi ? '✔️' : '❌'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Bàn Ủi">
                                {selectedRoomDetails.banUi ? '✔️' : '❌'}
                            </Descriptions.Item>
                        </Descriptions>

                        <Descriptions className="text-start">
                        </Descriptions>

                    </div>
                )}
            </Modal>
            <div className="searchTableWrapper flex pb-3 w-full justify-center">
                <input className="p-2 rounded-10 w-2/3 searchInputAdmin" placeholder="Nhập tên phòng" value={keyword} onChange={handleSearchChange} />
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
