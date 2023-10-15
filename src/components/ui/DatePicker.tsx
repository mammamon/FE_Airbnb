import { DatePicker as DatePickerA, DatePickerProps as DatePickerPropsA } from "antd";  

type DatePickerProps = DatePickerPropsA

export const DatePicker = (props: DatePickerProps) => {
    return (
      <DatePickerA 
        format='DD.MM.YYYY' 
        inputReadOnly={true} 
        {...props} 
      />
    )
}
