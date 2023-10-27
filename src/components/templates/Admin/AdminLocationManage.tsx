import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "components";
import { Modal, Table, Descriptions } from "antd";
import { apiInstance } from "constant";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LocationSchema, LocationSchemaType } from "schema";
import { useState, useEffect } from "react";
import { handleError, pagination, useSearch, sortFilterTable, deleteItem, editItem, uploadFile } from "utils";

export const AdminLocationManage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { keyword, handleSearchChange } = useSearch('vi-tri/search');
    const [editingLocation, setEditingLocation] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedLocationDetails, setSelectedLocationDetails] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<LocationSchemaType>({
        mode: "onChange",
        resolver: zodResolver(LocationSchema),
    });

    const onSubmit = async (values) => {
        try {
            if (editingLocation) {
                // handle edit
                const updatedLocation = await editItem('vi-tri', editingLocation.id, values);
                console.log("Updated Location:", updatedLocation);
                toast.success('Cập nhật vị trí thành công!', {
                    position: 'top-center',
                    autoClose: 800,
                });

                setIsModalVisible(false);
                reset();
                fetchLocationPagination();

                // Upload file
                const fileInput = document.querySelector('#hinhAnh') as HTMLInputElement;
                if (fileInput.files && fileInput.files.length > 0) {
                    const imageUrl = await uploadFile('/vi-tri/upload-hinh-vitri', editingLocation.id, fileInput.files[0]);
                    setValue('hinhAnh', imageUrl);
                }
            } else {
                // handle add
                const api = apiInstance({
                    baseURL: import.meta.env.VITE_API,
                });
                const response = await api.get('/vi-tri');
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
                    throw new Error('Vị trí đã tồn tại');
                }

                const addedLocation = await api.get('vi-tri', { params: values });
                toast.success('Thêm vị trí thành công!', {
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



    const handleEditLocation = (record) => {
        console.log("Editing record:", record);
        setEditingLocation(record);
        showModal();
    };

    const handleDeleteLocation = async (item) => {
        if (window.confirm('Bạn muốn xóa vị trí này?')) {
            try {
                await deleteItem('vi-tri', item.id);
                fetchLocationPagination();
                toast.success('Xóa vị trí thành công!', {
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
        setEditingLocation(null);
        reset({
            tenViTri: '',
            tinhThanh: '',
            quocGia: '',
            hinhAnh: '',
        });
    };

    const onFileChange = async (event, maViTri) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const api = apiInstance({
            baseURL: import.meta.env.VITE_API,
        });

        try {
            const response = await api.post(`/vi-tri/upload-hinh-vitri?maViTri=${maViTri}`, formData, {
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

    const showDetailsModal = (location) => {
        setSelectedLocationDetails(location);
        setIsDetailsModalVisible(true);
    };

    const handleDetailsModalCancel = () => {
        setIsDetailsModalVisible(false);
        setSelectedLocationDetails(null);
    };

    const fetchLocationPagination = async (pageIndex = 1, pageSize = 100) => {
        setLoading(true);
        try {
            const response = await pagination('vi-tri/phan-trang-tim-kiem', pageIndex, pageSize, keyword);
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
            title: 'Quốc Gia', dataIndex: 'quocGia',
        },
        {
            title: 'Tỉnh Thành', dataIndex: 'tinhThanh',
        },
        {
            title: 'Tên Vị Trí', dataIndex: 'tenViTri',
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
                        onClick={() => handleEditLocation(record)}
                        disabled={record.id <= 10}
                    >
                        Sửa
                    </Button>
                    <Button
                        onClick={() => handleDeleteLocation(record)}
                        disabled={record.id <= 10}
                    >
                        Xóa
                    </Button>
                </>
            ),
        }


    ], data);

    useEffect(() => {
        fetchLocationPagination();
        // eslint-disable-next-line
    }, [keyword]);

    useEffect(() => {
        if (editingLocation) {
            reset({
                ...editingLocation,
            });
        }
    }, [editingLocation, reset]);


    return (
        <div>
            <Button className="mb-3 !p-10 !h-[48px]" type="primary" onClick={showModal}>
                Thêm vị trí
            </Button>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex items-center justify-between">
                    <h2>{editingLocation ? "Cập nhật vị trí" : "Thêm vị trí mới"}</h2>
                    <img src="../../../images/airbnb.svg" className="w-[130px] h-[32px]" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className="mt-16"
                        placeholder="Tên vị trí"
                        id="tenViTri"
                        name="tenViTri"
                        error={errors?.tenViTri?.message}
                        register={register}
                    />
                    <Input
                        className="mt-16"
                        placeholder="Tỉnh thành"
                        id="tinhThanh"
                        name="tinhThanh"
                        error={errors?.tinhThanh?.message}
                        register={register}
                    />
                    <Input
                        className="mt-16"
                        placeholder="Quốc gia"
                        id="quocGia"
                        name="quocGia"
                        error={errors?.quocGia?.message}
                        register={register}
                    />
                    {/* input upload hình */}
                    {editingLocation && (
                        <div>
                            <Input
                                className="mt-16"
                                placeholder="Hình ảnh"
                                disabled={true}
                                id="hinhAnh"
                                name="hinhAnh"
                                register={register}
                            />
                            <h3 className="mb-3">Tải ảnh lên (tự chọn)</h3>
                            <Input type="file" onChange={(event) => onFileChange(event, editingLocation.id)} />
                        </div>

                    )}
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-1/3 p-10 text-[20px] mt-2">
                            {editingLocation ? "Cập nhật vị trí" : "Thêm vị trí"}
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
                {selectedLocationDetails && (
                    <div className="detailsModal flex flex-column justify-center items-center">
                        <img
                            src={selectedLocationDetails.hinhAnh || '../../../../images/no-image.jpg'}
                            width={240} height={240}
                            alt="vị trí"
                            className="mb-3"
                        />
                        <Descriptions column={2}>
                            <Descriptions.Item label="Tên Vị Trí">{selectedLocationDetails.tenViTri}</Descriptions.Item>
                            <Descriptions.Item label="ID - Mã vị trí">{selectedLocationDetails.id}</Descriptions.Item>
                            <Descriptions.Item label="Tỉnh Thành">{selectedLocationDetails.tinhThanh}</Descriptions.Item>
                            <Descriptions.Item label="Quốc Gia">{selectedLocationDetails.quocGia}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
            <div className="searchTableWrapper flex pb-3 w-full justify-center">
                <input className="p-2 rounded-10 w-2/3 searchInputAdmin" placeholder="Nhập tên vị trí" value={keyword} onChange={handleSearchChange} />
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
