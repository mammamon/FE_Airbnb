import { Image } from "components";
import { useAuth } from "hooks";
import { formatTime } from "utils";

export const AccountBookedHistory = () => {
  const { booked } = useAuth();
  console.log(booked);
  return (
    <div className="account-booked overflow-y-scroll !h-[300px]">
      {booked?.thongTinDatVe.map((ticket) => (
        <div key={ticket.tenPhim} className="mb-10  ">
          <div className="flex !items-center ">
            <Image
              src={ticket.hinhAnh}
              className="rounded flex-none w-2/12"
              width={100}
              height={100}
              preview={false}
              alt=""
            />
            <div className="ml-4 w-10/12">
              <p className="font-500 text-red-500">{ticket.danhSachGhe[0].tenHeThongRap}</p>
              <p>
                <span className="font-500">Ngày đặt: </span> {formatTime(ticket.ngayDat).date}{" "}
                {formatTime(ticket.ngayDat).time} -{" "}
                <span className="font-500">{ticket.danhSachGhe[0].tenCumRap}</span>
                </p>
                <p className="break-all">
                <span className="font-500">Ghế: </span> 
                  {ticket.danhSachGhe.map((ghe) => ghe.tenGhe) + ","}
                </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
