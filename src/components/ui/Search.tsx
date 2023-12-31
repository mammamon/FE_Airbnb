import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, InputNumber, Select, Space, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getLocalRoomListThunk } from "store/LocalRoomStore";
import { RangePickerProps } from "antd/es/date-picker";
import { generatePath, useNavigate} from "react-router-dom";
import { PATH } from "constant";
import cn from "classnames";
import {  removeLocalStorage, setLocalStorage} from "utils";
import isBetween from "dayjs/plugin/isBetween";
import { BookedRoom, BookingRoom } from "types";
import customParseFormat from "dayjs/plugin/customParseFormat"
import { postBookingRoomThunk } from "store/BookingRoomStore";
import { useAuth } from "hooks";


type FormProps = {
  isSearchHeader?: boolean;
  name?: string;
  guestMax?: number;
  bookedList?: BookedRoom[];
  costRent?:number;
  onClickEvent?:boolean,
  idRoom?:number,
  scroll?:boolean,
  isHomePage?:boolean
};

export const Search = ({
  isSearchHeader = true,
  name,
  guestMax = 30,
  bookedList = [],
  costRent=0,
  onClickEvent=true,
  idRoom,
  isHomePage=false,
  scroll=false,
}: FormProps) => {
  const { localRoomList} = useSelector((state: RootState) => state.localRoom);
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  // const [dataLocal, setDatalocal] = useState(getLocalStorage("local")||{});
  const [form] = Form.useForm();
  const {user}=useAuth()
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
    const numberRentDay = allFields.rangePicker?dayjs(allFields.rangePicker[1]).diff(allFields.rangePicker[0],"day"):0;
    const amountGuestValue = allFields.amountGuest?allFields.amountGuest:0;
    setCost(numberRentDay *amountGuestValue*costRent)
  }
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Đặt phòng thành công",
    });
  };

  
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
      // setDatalocal({ ...values });
      setLocalStorage("local", values);
      setLocalStorage("localId", localId);
      const path = generatePath(PATH.roomList, {
        cityName: local[1],
      });
      navigate(path);
  }
  else{
    if(user?.token){
      const rangeValue = fieldsValue["rangePicker"];
      const amountGuest = fieldsValue["amountGuest"];
      const data:BookingRoom={
        id:0,
        maPhong:idRoom,
        ngayDen:rangeValue[0],
        ngayDi:rangeValue[1],
        soLuongKhach:amountGuest,
        maNguoiDung:user.user.id
      }
      dispatch(postBookingRoomThunk(data))
      success()
    }
    else{
      navigate(PATH.login)
    }
  }   
  };
  // useEffect(() => {
  //   if (!Object.keys(param).length || !param.cityName) {
  //     setDatalocal({});
  //     form.resetFields();
  //   } else if (param.cityName) {
  //     setDatalocal(getLocalStorage("local"));
  //   }
  // }, [Object.keys(param).length]);

  
 
  useEffect(() => {
    dispatch(getLocalRoomListThunk());
  }, [dispatch]);

  return (
    <Form
      name={name}
      onFinish={onFinish}
      style={{ width: "fit-content" }}
      requiredMark={false}
      layout={isSearchHeader?"vertical":"horizontal"}
      form={form}
      colon={false}
      onValuesChange={onValuesChange}
      initialValues={
         { amountGuest: 1 }
      }
    >
        {contextHolder}
      {isSearchHeader && (
        <Form.Item
          name="localInput"
          label={isHomePage ?"Địa điểm": ""}
          {...config}
        >
          <Select
            showSearch
            id="local"
            placeholder="Bạn muốn đi đâu?"
            optionFilterProp="name"
            popupClassName={cn({"form-home-page":!isHomePage,"scroll":scroll})}
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
        label={isHomePage ?"Ngày đến - Ngày đi": "" }
        {...rangeConfig}
      >
        <RangePicker
          placeholder={["Nhận phòng", "Trả phòng"]}
          popupClassName={cn({"form-home-page":!isHomePage,"scroll":scroll})}
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
        label={isHomePage ?"Khách": "" }
        {...amountConfig}
      >
        <InputNumber min={1} max={100} {...amountConfig} />
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
