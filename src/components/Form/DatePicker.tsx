import React from "react";
import ReactNativeDatePicker from "react-native-datepicker";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  minDate?: string;
  maxDate?: string;
}

/**
 * 日付選択フォーム
 * @author kotatanaka
 */
const DatePicker: React.FC<Props> = (props: Props) => {
  const { date, setDate, minDate, maxDate } = props;

  return (
    <ReactNativeDatePicker
      style={{ width: 200 }}
      date={date}
      mode="date"
      format="YYYY-MM-DD"
      minDate={minDate}
      maxDate={maxDate}
      confirmBtnText="決定"
      cancelBtnText="キャンセル"
      customStyles={{ dateInput: { marginLeft: 20 } }}
      onDateChange={date => setDate(date)}
    />
  );
};

DatePicker.defaultProps = {
  minDate: "1970-01-01",
  maxDate: "2020-12-31"
};

export default DatePicker;
