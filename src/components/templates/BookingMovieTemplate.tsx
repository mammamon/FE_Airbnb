import {  useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  bookedChairListThunk,
  getChairListThunk,
} from "store/quanLyDatVe/thunk";
import { toast } from 'react-toastify'
import { Button, Card, Image, Skeleton } from "components";
import { Col, Row } from "antd";
import cs from "classnames";
import { handleError } from "utils";

interface danhsach {
  maGhe: number;
  giaVe: number;
}

export const BookingMovieTemplate = () => {
  const dispatch = useAppDispatch();
  const { bookingId } = useParams();
  const { chairList, isFetchingChairList} = useSelector(
    (state: RootState) => state.quanLyDatVe
  );
  const [select, setSelect] = useState<
    {
      maGhe: number;
      giaVe: number;
    }[]
  >([]);
  const bookedchair = {
    maLichChieu: chairList?.thongTinPhim.maLichChieu,
    danhSachVe: select,
  };
  const handleSelect = (ds: danhsach) => {
    if (!select) {
      select.push(ds);
      setSelect([...select]);
    } else if (select?.findIndex((i) => i.maGhe === ds.maGhe) === -1) {
      select.push(ds);
      setSelect([...select]);
    } else {
      select?.splice(
        select.findIndex((i) => i.maGhe === ds.maGhe),
        1
      );
      setSelect([...select]);
    }
  };
  
  useEffect(() => {
    dispatch(getChairListThunk(bookingId));
  }, [dispatch,bookingId]);
  
  
  if (isFetchingChairList) {
    return (
      <div>
        <Card className="h-auto w-full">
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
        <div className="flex !mt-20">
          <div className="w-8/12 ">
            <Card className="!w-11/12 ">
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </div>
          <div className="w-4/12">
          <Card className="!w-11/12 ">
          <Skeleton paragraph={{ rows: 4 }}></Skeleton>
            </Card>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-movie">
      <h1 className="text-center mb-16 font-500 text-[26px] text-red-500">
        {chairList?.thongTinPhim.tenCumRap} <br />{" "}
        {chairList?.thongTinPhim.diaChi}
      </h1>
      <div className="booking-movie-detail flex gap-4">
        <Image
          src={chairList?.thongTinPhim.hinhAnh}
          className="rounded"
          width={100}
          preview={false}
          alt=""
        />
        <div>
          <p>Tên phim: {chairList?.thongTinPhim.tenPhim}</p>
          <p>
            Ngày chiếu: {chairList?.thongTinPhim.ngayChieu} | Giờ chiếu:{" "}
            {chairList?.thongTinPhim.gioChieu}
          </p>
          <p>{chairList?.thongTinPhim.tenRap}</p>
        </div>
      </div>
      <div className="flex mt-10 justify-between">
        <div className="chair-booking w-8/12">
          <p className="w-full bg-orange-500 text-16 font-500 shadow-[0px_25px_25px_-7px_rgba(0,0,255,0.9)] text-center">
            Screen
          </p>
          <div className="w-full px-[20px]  mt-[35px] ">
            <Row gutter={[5, 5]} justify="center">
              {chairList?.danhSachGhe.map((ghe) => (
                <Col key={ghe.maGhe} span={2}>
                  <Button
                    onClick={() => {
                      handleSelect({ maGhe: ghe.maGhe, giaVe: ghe.giaVe });
                    }}
                    disabled={ghe.daDat}
                    className={cs(
                      {
                        booked: ghe.daDat,
                        vip: ghe.loaiGhe === "Vip" && !ghe.daDat,
                      },
                      "!px-0",
                      "!w-full",
                      { selected: select?.some((x) => x.maGhe == ghe.maGhe)&& !ghe.daDat }
                    )}
                  >
                    {ghe.tenGhe}
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
          <div className="flex justify-around mt-24">
            <div className="flex">
              <p className="h-24 w-24 rounded-6 bg-[#ff0000] mr-3 "></p>
              <p>Ghế Vip</p>
            </div>
            <div className="flex">
              <p className="h-24 w-24 rounded-6 bg-white border border-[#d9d9d9] mr-3 "></p>
              <p>Ghế Thường</p>
            </div>
            <div className="flex">
              <p className="h-24 w-24 rounded-6 bg-[#ffa500] mr-3 "></p>
              <p>Ghế Đã Đặt</p>
            </div>
            <div className="flex">
              <p className="h-24 w-24 rounded-6 bg-[#19da19] mr-3 "></p>
              <p>Ghế Đang Chọn</p>
            </div>
          </div>
        </div>
        <div className="bill w-4/12 ml-10 border p-5 h-fit shadow-xl bg-gray-200">
          <h2 className="text-center text-red-500 font-500 mb-20">
            {chairList?.thongTinPhim.tenPhim}
          </h2>
          <div className="flex justify-between mb-10">
            <p className="font-500">Ngày chiếu giờ chiếu</p>
            <p>
              {chairList?.thongTinPhim.ngayChieu} |{" "}
              {chairList?.thongTinPhim.gioChieu}
            </p>
          </div>
          <div className="flex justify-between mb-10">
            <p className="font-500">Cụm rạp</p>
            <p>{chairList?.thongTinPhim.tenCumRap}</p>
          </div>
          <div className="flex justify-between mb-10">
            <p className="font-500">Rạp</p>
            <p>{chairList?.thongTinPhim.tenRap}</p>
          </div>
          {select?.map((ghe) => (
            <div key={ghe.maGhe} className="flex justify-between mb-3">
              <p>
                <span className="font-500">Ghế chọn:&nbsp;</span> {ghe.maGhe}
              </p>
              <p>
                <span className="font-500">Gía:&nbsp;</span>
                {ghe.giaVe}{" "}
                <Button
                  onClick={() => {
                    handleSelect(ghe);
                  }}
                  className="!bg-red-500 !text-white"
                >
                  X
                </Button>
              </p>
            </div>
          ))}
          <div className="flex justify-between mt-10 text-red-500 font-500 ">
            <p>Tổng tiền</p>
            <p>
              {select?.reduce((prev, curr) => {
                return prev + curr.giaVe;
              }, 0)}
            </p>
          </div>
          <Button
            className="w-full mt-10 !bg-green-500 !text-white !font-500 !text-16 !h-auto"
            onClick={() => {
              dispatch(bookedChairListThunk(bookedchair)).unwrap()
              .then(()=>{
                setSelect([])
                dispatch(getChairListThunk(bookingId))
                toast.success('Đặt vé thành công!', {
                  position: "top-center",
                  autoClose: 1000,
              })
              }).catch((err) => {
                handleError(err)
            });
            }}
          >
            Thanh Toán
          </Button>
        </div>
      </div>
    </div>
  );
};
