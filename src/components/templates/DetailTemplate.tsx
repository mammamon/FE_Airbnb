import {  Rate, Button, Card, Tabs, Scroll } from "components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getMovieDetailThunk } from "store/quanLyRap";
import { formatTime } from "utils";
import cs from "classnames";
import { checkDate } from "utils";
import { PATH } from "constant";

export const DetailTemplate = () => {
  const navigate = useNavigate();
  const { detailId } = useParams();
  const dispatch = useAppDispatch();
  const { movieDetail } = useSelector((state: RootState) => state.quanLyRap);
  const [selectedCinemaList, setSelectedCinemaList] = useState(null);
  const [selectedCumRap, setSelectedCumRap] = useState(null);
  const [selectedDay, setSelectedDay] = useState("Thứ Hai");
  const day = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];
  useEffect(() => {
    dispatch(getMovieDetailThunk(detailId));
  }, [dispatch, detailId]);
  useEffect(() => {

    if (movieDetail?.heThongRapChieu?.length > 0) {
      setSelectedCinemaList(movieDetail?.heThongRapChieu[0]);
      setSelectedCumRap(movieDetail.heThongRapChieu[0].cumRapChieu);
    }
  }, [movieDetail]);

  return (
    <div className="detail-movie">
      <div className="detail-card flex p-10">
        <div className="movie-icon w-4/12 ">
          <img className="rounded-6 w-full h-full" src={movieDetail?.hinhAnh} />
        </div>
        <div className="movie-info w-8/12 ml-4 ">
          <h2 className="text-30 font-600">{movieDetail?.tenPhim}</h2>
          <p className="mt-6 text-20">{movieDetail?.moTa}</p>
          {movieDetail?.dangChieu ? (
            <p className="mt-6 text-20">Tình trạng: Đang chiếu</p>
          ) : (
            <p className="mt-6 text-20">Tình trạng: Sắp chiếu</p>
          )}
          <p className="mt-6 text-20">
            Ngày khởi chiếu: {movieDetail?.ngayKhoiChieu.slice(0, 10)}
          </p>
          <p className="mt-6 text-20">
            Đánh giá: {<Rate value={movieDetail?.danhGia} />}
          </p>
          <div className="flex">
            <Button
              className="btn-trailer"
              href={movieDetail?.trailer}
              target="_blank"
            >
              XEM TRAILER
            </Button>
            <Button
              className="btn-booking"
              onClick={() => {
                Scroll("booking-list");
              }}
            >
              MUA VÉ NGAY
            </Button>
          </div>
        </div>
      </div>
      <div
        className={cs(
          { "!hidden": movieDetail?.heThongRapChieu?.length > 0 },
          "text-center",
          "mt-10",
          "font-500",
          "text-red-500"
        )}
      >
        <h1>PHIM KHÔNG CÓ SUẤT CHIẾU</h1>
      </div>
      <div
        id="booking-list"
        className={cs(
          { "!hidden": movieDetail?.heThongRapChieu?.length <= 0 },
          "cinema-zone",
          "flex"
        )}
      >
        <div className="cinema-list mt-8 mr-10 w-3/12">
          {movieDetail?.heThongRapChieu.map((cinema) => (
            <Card
              key={cinema.maHeThongRap}
              hoverable
              className={cs(
                {
                  selected:
                    selectedCinemaList?.maHeThongRap === cinema.maHeThongRap,
                },
                "!w-full",
                "!h-auto",
                "!mb-10"
              )}
              onClick={() => {
                setSelectedCinemaList(cinema);
                setSelectedCumRap(cinema.cumRapChieu);
              }}
            >
              <div className="flex items-center w-full">
                <img
                  src={cinema.logo}
                  alt={cinema.tenHeThongRap}
                  className="w-[100px] h-auto mr-10"
                />
                <p className="text-20">{cinema.tenHeThongRap}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="cinema-location mt-8 w-8/12">
          <Tabs
            defaultActiveKey={checkDate.number()}
            onTabClick={(activeKey) => {
              setSelectedDay(activeKey);
            }}
            items={day.map((thu) => {
              return {
                label: thu,
                key: thu,
                children:(          
                <div >
                  {selectedCumRap?.map((rap) => (
                    rap.lichChieuPhim.find((lich)=> !checkDate.day(selectedDay,lich.ngayChieuGioChieu))&&
              <div key={rap.maCumRap}>
                <div>
                  <div className="grid grid-cols-[100px_minmax(0,1fr)] grid-rows-2 gap-5 my-10">
                    <div>
                      <img src={rap.hinhAnh} className=" mr-12" />
                    </div>
                    <div className="row-span-2 grid grid-cols-1 grid-rows-[100px_minmax(0,1fr)]">
                      <div className="info-cinema mt-20 ">
                        <h3>{rap.tenCumRap}</h3>
                        <p>{rap.diaChi}</p>
                      </div>

                      <div className="time-movie">
                        {rap?.lichChieuPhim.map((lichChieu) => (

                          <Button
                            onClick={() => {
                              const path = generatePath(PATH.booking, {
                                bookingId: lichChieu.maLichChieu,
                              });
                              if(localStorage.getItem("ACCESSTOKEN")){
                                navigate(path);
                              }else{
                                navigate(PATH.login)
                                localStorage.setItem("bookingId",lichChieu.maLichChieu)
                              }
                            }}
                            className={cs({
                              "!hidden": checkDate.day(
                                selectedDay,
                                lichChieu.ngayChieuGioChieu
                              ),
                            })}
                            key={lichChieu.maLichChieu}
                          >
                            {formatTime(lichChieu.ngayChieuGioChieu).time}
                          </Button>

                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
               
              </div>),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

