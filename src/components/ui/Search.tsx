import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getLocalRoomListThunk } from "store/LocalRoomStore";
import { RangePickerProps } from "antd/es/date-picker";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { PATH } from "constant";
import cn from "classnames"
import { setLocalStorage } from "utils";
export const Search = () => {
  const param = useParams();
  const isChooseLocal =Object.keys(param).length?true:false;
  const { localRoomList } = useSelector((state: RootState) => state.localRoom);
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  
  // ------------------------------------------------------------------------------------------------------
  const dateFormat = 'DD/MM/YYYY';

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  const config = {
    rules: [{ required: true, message: "Hãy chọn địa điểm" }],
  };

  const rangeConfig = {
    rules: [
      { type: "array" as const, required: true, message: "Hãy chọn ngày" },
    ],
  };
  const amountConfig = {
    rules: [
      {
        type: "number" as const,
        min: 1,
        message: "Hãy chọn số lượng khách",
      },
    ],
  };

  const onFinish = (fieldsValue: object) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue["range-picker"];
    const local = fieldsValue["local-input"].split(",");
    const amountGuest = fieldsValue["amount-guest"];
    const values = {
      "rangePicker": [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
      "localInput": local,
      "amountGuest": amountGuest,
    };
    const path = generatePath(PATH.roomList, {
      cityName: local[1],
    });
    navigate(path);
    setLocalStorage("local", values);
  };

  //----------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getLocalRoomListThunk());
  },[dispatch]);
  
console.log(localRoomList)
  return (
    <Form
      className={cn({"form-home":!isChooseLocal})}
      name="time_related_controls"
      onFinish={onFinish}
      style={{ width: "fit-content" }}
      requiredMark={false}
      layout="inline"
      colon={false}
      
    >
      <Form.Item name="local-input" label={isChooseLocal?"":"Địa điểm"} {...config}>
        <Select
          showSearch
          id="local"
          placeholder="Bạn muốn đi đâu?"
          optionFilterProp="children"
          value=""
          popupClassName={isChooseLocal&&"form-home"}
        >
          {localRoomList?.map((local) => (
            <Option
              key={local.id}
              value={[local.tenViTri,local.tinhThanh,local.quocGia,local.id].toString()}
            >
              {local.tenViTri}, {local.tinhThanh}, {local.quocGia}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="range-picker"
        label={isChooseLocal?"":"Ngày nhận - Ngày trả"}
        {...rangeConfig}
      >
        <RangePicker 
        // defaultValue={localChoose&&[dayjs(`${localChoose.rangePicker[0]}`, dateFormat), dayjs(`${localChoose.rangePicker[1]}`, dateFormat)]}
        popupClassName={isChooseLocal&&"form-home"}
      format={dateFormat} disabledDate={disabledDate} />
      </Form.Item>
      <Form.Item name="amount-guest" label={isChooseLocal?"":"Khách"} {...amountConfig} initialValue={1}>
        <InputNumber min={0} max={100} 
        {...amountConfig}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          shape="circle"
          htmlType="submit"
          size="large"
          icon={<SearchOutlined />}
        />
      </Form.Item>
    </Form>
    
  );
};
