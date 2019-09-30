import moment from "moment";

/**
 * 日付を任意の形式に変換する
 * @param value 入力値
 * @param format 変換する形式
 * @return 変換後の日付文字列
 */
export function formatDate(value: string | number, format: string): string {
  var datetime = moment(value);

  if (!datetime.isValid) {
    console.warn("Cannot convert by Moment");
    return "";
  }

  return datetime.format(format);
}

/**
 * 今日の日付を「yyyy-MM-dd」形式で取得する
 * @return yyyy-MM-dd
 */
export function getToday(): string {
  return moment().format("YYYY-MM-DD");
}

/**
 * 日付をDateオブジェクトに変換する
 * @param value 入力値
 * @return Dateオブジェクト(変換できなければnull)
 */
export function toDate(value: string | number): Date | null {
  var datetime = moment(value);

  if (!datetime.isValid) {
    console.warn("Cannot convert by Moment");
    return null;
  }

  return datetime.toDate();
}

/**
 * 日付からから年齢を計算する
 * @param value 入力値
 * @return 年齢
 */
export function getAge(value: string | number): number {
  var d = moment(value);

  if (!d.isValid) {
    console.warn("Cannot convert by Moment");
    return 0;
  }

  var dObj = d.toObject();
  var birthDate = moment()
    .year(dObj.years)
    .month(dObj.months - 1)
    .date(dObj.date);

  return moment().diff(birthDate, "years");
}
