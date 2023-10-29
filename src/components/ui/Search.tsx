import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, InputNumber, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getLocalRoomListThunk } from "store/LocalRoomStore";
import { RangePickerProps } from "antd/es/date-picker";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { PATH } from "constant";
// import cn from "classnames";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "utils";
import isBetween from "dayjs/plugin/isBetween";
import { BookedRoom, BookingRoom } from "types";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { postBookingRoomThunk } from "store/BookingRoomStore";

type FormProps = {
  isSearchHeader?: boolean;
  name?: string;
  guestMax?: number;
  bookedList?: BookedRoom[];
  costRent?:number;
  onClickEvent?:boolean,
  idRoom?:number,
};

export const Search = ({
  isSearchHeader = true,
  name,
  guestMax = 30,
  bookedList = [],
  costRent=0,
  onClickEvent=true,
  idRoom,
}: FormProps) => {
  const param = useParams();
  const isRoomDetail = Object.keys(param).length ? true : false;
  const { localRoomList} = useSelector((state: RootState) => state.localRoom);
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const [dataLocal, setDatalocal] = useState(getLocalStorage("local") || {});
  const [form] = Form.useForm();
  removeLocalStorage("userBookedRoom")
 
  // ------------------------------------------------------------------------------------------------------
  const dateFormat = "YYYY/MM/DD";
  dayjs.extend(isBetween);
  dayjs.extend(customParseFormat)
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (!bookedList) {
      return current && current < dayjs().startOf("day");
    } else {
      const isSame = () => {
        if (
          bookedList.findIndex(
            (x) => dayjs(x.ngayDen).toISOString() === current.toISOString()
          ) !== -1
        ) {
          return true;
        }
        if (
          bookedList.findIndex(
            (x) => dayjs(x.ngayDi).toISOString() === current.toISOString()
          ) !== -1
        ) {
          return true;
        }

        return false;
      };

      const isBetween = () => {
        const between = bookedList.map((x) =>
          dayjs(current).isBetween(
            x.ngayDen.toString().slice(0, 10),
            dayjs(x.ngayDi.toString().slice(0, 10))
          )
        );
        if (between.findIndex((x) => x === true) !== -1) {
          return true;
        } else {
          return false;
        }
      };
      return (
        (current && current < dayjs().startOf("day")) || isBetween() || isSame()
      );
    }
  };
  const config = {
    rules: [{ required: true, message: "Hãy chọn địa điểm" }],
  };
  const rangeConfig = {
    rules: [
      { type: "array" as const, required: true, message: "Hãy chọn ngày" },
      {
        validator: (_, value) =>
       {
        const mes = ()=>{if(value){
          for(let i=0;i<=dayjs(value[1]).diff(value[0], 'day');i++){
            const day =dayjs(value[0]).add(i,"day")
            for(let j=0;j<bookedList.length;j++){
              if (dayjs(day).isBetween(dayjs(bookedList[j].ngayDen).subtract(1,"day"),dayjs(bookedList[j].ngayDi).add(1,"day"))){
            return true
            }
          }
        }
        return false}}
      
        if(mes()){
          return Promise.reject(new Error('Phòng đã có người đặt'));
        }
        else if(!mes()||value===null) {return Promise.resolve();}
       }
      },
    ],
  };
  const amountConfig = {
    rules: [
      {
        type: "number" as const,
        min: 1,
        message: "Hãy chọn số lượng khách",
      },
      {
        type: "number" as const,
        max: guestMax,
        message: `Số lượng khách quá ${guestMax} khách `,
      },
    ],
  };
  const [cost,setCost]=useState(0)
  
  const onValuesChange=(_,allFields)=>{
    console.log("kiem soat value",allFields)
    const numberRentDay = allFields.rangePicker?dayjs(allFields.rangePicker[1]).diff(allFields.rangePicker[0],"day"):0;
    const amountGuestValue = allFields.amountGuest?allFields.amountGuest:0;
    setCost(numberRentDay *amountGuestValue*costRent)
  }

  
  const onFinish = (fieldsValue: object) => { if(onClickEvent){

      const rangeValue = fieldsValue["rangePicker"];
      const local = fieldsValue["localInput"].split(",").slice(0, 3);
      const localId = fieldsValue["localInput"].split(",").slice(3, 4);
      const amountGuest = fieldsValue["amountGuest"];
      const values = {
        rangePicker: [
          rangeValue[0].format(dateFormat),
          rangeValue[1].format(dateFormat),
        ],
        localInput: local,
        localId: localId,
        amountGuest: amountGuest,
      };
      setDatalocal({ ...values });
      setLocalStorage("local", values);
      const path = generatePath(PATH.roomList, {
        cityName: local[1],
      });
      navigate(path);
  }
  else{
    const rangeValue = fieldsValue["rangePicker"];
    const amountGuest = fieldsValue["amountGuest"];
    const data:BookingRoom={
      id:0,
      maPhong:idRoom,
      ngayDen:rangeValue[0],
      ngayDi:rangeValue[1],
      soLuongKhach:amountGuest,
      maNguoiDung:3829
    }
    dispatch(postBookingRoomThunk(data))
  }
    
  };
  useEffect(() => {
    if (!Object.keys(param).length) {
      setDatalocal({});
      form.resetFields();
    } else if (param.cityName) {
      setDatalocal(getLocalStorage("local"));
    }
  }, [Object.keys(param).length]);
  //----------------------------------------------------------------------------------------------
  useEffect(() => {
    dispatch(getLocalRoomListThunk());
  }, [dispatch]);
  return (
    <Form
      name={name}
      onFinish={onFinish}
      style={{ width: "fit-content" }}
      requiredMark={false}
      layout="inline"
      form={form}
      colon={false}
      onValuesChange={onValuesChange}
      initialValues={
        Object.keys(param).length
          ? {
              rangePicker: [
                dayjs(dataLocal?.rangePicker[0], dateFormat),
                dayjs(dataLocal?.rangePicker[1], dateFormat),
              ],
              localInput: dataLocal?.localInput?.join(", ").toString(),
              amountGuest: getLocalStorage("local")?.amountGuest,
            }
          : { amountGuest: 1 }
      }
    >
      {isSearchHeader && (
        <Form.Item
          name="localInput"
          label={isRoomDetail ? "" : "Địa điểm"}
          {...config}
        >
          <Select
            showSearch
            id="local"
            placeholder="Bạn muốn đi đâu?"
            optionFilterProp="label"
            popupClassName={isRoomDetail && "form-home"}
          >
            {localRoomList?.map((local) => (
              <Option
                key={local.id}
                value={[
                  local.tenViTri,
                  local.tinhThanh,
                  local.quocGia,
                  local.id,
                ].toString()}
              >
                {local.tenViTri}, {local.tinhThanh}, {local.quocGia}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item
        name="rangePicker"
        label={isRoomDetail ? "" : "Ngày nhận - Ngày trả"}
        {...rangeConfig}
      >
        <RangePicker
          placeholder={["Nhận phòng", "Trả phòng"]}
          popupClassName={isRoomDetail && "form-home"}
          format={dateFormat}
          disabledDate={disabledDate}
          // onBlur={numberDayHandle()}
        />
      </Form.Item>
      <Form.Item
        // hasFeedback
        // validateDebounce={1000}
        validateTrigger="onChange"
        name="amountGuest"
        label={isRoomDetail ? "" : "Khách"}
        {...amountConfig}
      >
        <InputNumber min={0} max={100} {...amountConfig} />
      </Form.Item>
      <Form.Item>
        {isSearchHeader ? (
          <Button
            type="primary"
            shape="circle"
            htmlType="submit"
            size="large"
            icon={<SearchOutlined />}
          />
        ) : (
          <Button type="primary" shape="circle" htmlType="submit" size="large">
            Đặt phòng
          </Button>
        )}
      </Form.Item>
      { !isSearchHeader&&<Space
                direction="horizontal"
                size="middle"
                style={{
                  justifyContent:"space-between",
                  width: "100%",
                }}
              >
                  <h3>Tổng tiền</h3>
                  <p>{cost} $</p>
              </Space>}
    </Form>
  );
};
