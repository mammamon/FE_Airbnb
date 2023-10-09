import { DatePicker as DatePickerA, DatePickerProps as DatePickerPropsA } from "antd";  

type DatePickerProps = DatePickerPropsA


export const defaultDateFormats = [  
  "DD.MM.YYYY.",  
  "DD.MM.YYYY",  
  "DDMMYYYY",  
  "DDMMYY",  
];    

  export const DatePicker = (props: DatePickerProps) => {
    return <DatePickerA  format={defaultDateFormats} {...props} />
}
