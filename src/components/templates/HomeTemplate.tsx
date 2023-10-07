import { Card, Skeleton } from 'components';
import "animate.css"
import SwiperCarousel from '../../components/ui/SwiperCarousel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';
import { getMovieListThunk } from 'store/quanLyPhim';
import { quanLyBannerServices } from '../../services/quanLyBanner';
import { getCinemaListThunk, getCinemaScheduleThunk } from 'store/quanLyRap';
import { formatTime } from '../../utils/formatTime';
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";

export const HomeTemplate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { movieList, isFetchingMovieList } = useSelector((state: RootState) => state.quanLyPhim);
    const { cinemaList, isFetchingCinemaList } = useSelector((state: RootState) => state.quanLyRap);
    const [banners, setBanners] = useState([]);
    const [selectedCinemaList, setSelectedCinemaList] = useState(null);
    const [selectedCumRap, setSelectedCumRap] = useState(null);
    const { cinemaSchedule } = useSelector((state: RootState) => state.quanLyRap);
    const [selectedFilter, setSelectedFilter] = useState('tatCaPhim');
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        dispatch(getMovieListThunk(null));
        dispatch(getCinemaListThunk());

        const fetchBanners = async () => {
            const response = await quanLyBannerServices.getBanners();
            setBanners(response.data.content);
        };
        fetchBanners();
    }, [dispatch]);

    useEffect(() => {
        // tự động chọn rạp đầu tiên
        if (cinemaList?.length > 0) {
            setSelectedCinemaList(cinemaList[0].maHeThongRap);
        }
    }, [cinemaList]);

    useEffect(() => {
        if (selectedCinemaList) {
            dispatch(getCinemaScheduleThunk(selectedCinemaList));
        }
    }, [dispatch, selectedCinemaList]);

    useEffect(() => {
        if (cinemaSchedule?.length > 0) {
            const selectedCinemaSchedule = cinemaSchedule.find((schedule) => schedule.maHeThongRap === selectedCinemaList);
            if (selectedCinemaSchedule && selectedCinemaSchedule.lstCumRap.length > 0) {
                setSelectedCumRap(selectedCinemaSchedule.lstCumRap[0].maCumRap);
            }
        }
    }, [cinemaSchedule, selectedCinemaList]);

    // trigger animation khi click vào một trong 3 nút
    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        setAnimationKey((prevKey) => prevKey + 1);
    };

    return (
        <div>
            <SwiperCarousel data={banners} />
            <div className='btn-filter flex gap-[20px] justify-center mt-[40px] mb-[20px]'>
                <button
                    className={selectedFilter === 'tatCaPhim' ? 'selected' : ''}
                    onClick={() => handleFilterClick('tatCaPhim')}
                >
                    Tất cả phim
                </button>
                <button
                    className={selectedFilter === 'dangChieu' ? 'selected' : ''}
                    onClick={() => handleFilterClick('dangChieu')}
                >
                    Phim đang chiếu
                </button>
                <button
                    className={selectedFilter === 'sapChieu' ? 'selected' : ''}
                    onClick={() => handleFilterClick('sapChieu')}
                >
                    Phim sắp chiếu
                </button>
            </div>
            <div
                key={animationKey}
                className={`movies gap-y-[16px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${selectedFilter ? 'animate__animated animate__fadeInLeft' : ''
                    }`}
            >
                {isFetchingMovieList || isFetchingCinemaList ? (
                    [...Array(15)].map((_, index) => (
                        <Card key={index} className='!w-[240px] !h-[300px]'>
                            <Skeleton.Image className='!w-full !h-[200px]' active />
                            <div className='mt-16'>
                                <Skeleton.Input className='!w-full !h-[70px]' active />
                            </div>
                        </Card>
                    ))
                ) : (
                    movieList?.filter((movie) => {
                        if (selectedFilter === 'tatCaPhim') {
                            return movie.tenPhim.toLowerCase();
                        }
                        return movie[selectedFilter] && movie.tenPhim.toLowerCase();
                    }).map((movie) => (
                        <Card
                            key={movie.maPhim}
                            className='!mt-20'
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt='example' src={movie.hinhAnh} />}
                            onClick={() => {
                                const path = generatePath(PATH.detail, {
                                  detailId: movie.maPhim,
                                })
                                navigate(path)
                              }}
                        >
                            <Card.Meta title={movie.tenPhim} description={movie.moTa.substring(0, 30)} />
                        </Card>
                    ))
                )}
            </div>

            <div className="cinema-zone pt-[60px] flex">
                <div className="cinema-list-wrapper md:w-full lg:w-1/12 lg:mr-[10px]">
                    <h2>Cụm rạp</h2>
                    <div className="cinema-list gap-4 mt-8">
                        {cinemaList?.map((cinema) => (
                            <Card key={cinema.maHeThongRap} hoverable className={selectedCinemaList === cinema.maHeThongRap ? 'selected' : ''}>
                                <img
                                    src={cinema.logo}
                                    alt={cinema.tenHeThongRap}
                                    className="w-full h-auto"
                                    onClick={() => {
                                        setSelectedCumRap(null);
                                        setSelectedCinemaList(cinema.maHeThongRap);
                                        dispatch(getCinemaScheduleThunk(cinema.maHeThongRap));
                                        // Cập nhật state của cụm rạp
                                        const selectedCinemaSchedule = cinemaSchedule.find(schedule => schedule.maHeThongRap === cinema.maHeThongRap);
                                        if (selectedCinemaSchedule && selectedCinemaSchedule.lstCumRap.length > 0) {
                                            setSelectedCumRap(selectedCinemaSchedule.lstCumRap[0].maCumRap);
                                        }
                                    }}
                                />
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="cinema-location-wrapper w-3/12 pr-[6px] lg:mr-[10px] xl:mr-[30px]">
                    <h2>Địa điểm</h2>
                    <div className="cinema-location mt-8">
                        {cinemaSchedule?.map((schedule) => (
                            <div key={schedule.maHeThongRap}>
                                {schedule.lstCumRap.map((cumRap) => (
                                    <div key={cumRap.maCumRap} className={`cinema-name cursor-pointer p-[6px] pt-0 mr-[6px] mb-[10px] rounded-6 ${cumRap.maCumRap === selectedCumRap ? 'selected' : ''}`} onClick={() => {
                                        setSelectedCumRap(cumRap.maCumRap);
                                    }}>
                                        <h3>{cumRap.tenCumRap}</h3>
                                        <h4>{cumRap.diaChi}</h4>
                                        <img src={cumRap.hinhAnh} className="w-[100px]" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="cinema-schedule-wrapper w-8/12">
                    <h2>Lịch chiếu</h2>
                    <div className="cinema-schedule mt-8">
                        {selectedCinemaList && selectedCumRap && cinemaSchedule?.map((schedule) => (
                            <div key={schedule.maHeThongRap}>
                                {schedule.lstCumRap.map((cumRap) => (
                                    selectedCumRap === cumRap.maCumRap && cumRap.danhSachPhim.map((phim) => (
                                        <div key={phim.maPhim} className='cinema-schedule-movie flex p-[12px]'>
                                            <div className='w-1/3 sm:w-1/4 xl:w-2/12 pr-[8px]'>
                                                <h3>{phim.tenPhim}</h3>
                                                <img src={phim.hinhAnh} alt={phim.tenPhim} />
                                            </div>
                                            <div className="showtimes w-2/3 sm:w-3/4 xl:w-10/12">
                                                {phim.lstLichChieuTheoPhim &&
                                                    [...phim.lstLichChieuTheoPhim]
                                                        .sort((a, b) => new Date(a.ngayChieuGioChieu).getTime() - new Date(b.ngayChieuGioChieu).getTime())
                                                        .map((lichChieu) => (
                                                            <p key={lichChieu.maLichChieu}>
                                                                <span className="date">{formatTime(lichChieu.ngayChieuGioChieu).date}</span><br></br>
                                                                <span className="time">{formatTime(lichChieu.ngayChieuGioChieu).time}</span>
                                                            </p>
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    ))
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
