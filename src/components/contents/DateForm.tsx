import React from "react";
import DatePicker from "react-native-datepicker";

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
const DateForm: React.FC<Props> = ({ date, setDate, minDate, maxDate }) => {
  return (
    <DatePicker
      style={{ width: 200 }}
      date={date}
      mode="date"
      format="YYYY/MM/DD"
      minDate={minDate}
      maxDate={maxDate}
      confirmBtnText="決定"
      cancelBtnText="キャンセル"
      customStyles={{ dateInput: { marginLeft: 20 } }}
      onDateChange={date => setDate(date)}
    />
  );
};

DateForm.defaultProps = {
  minDate: "1970-01-01",
  maxDate: "2020-12-31"
};

export default DateForm;
