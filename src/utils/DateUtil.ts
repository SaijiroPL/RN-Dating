/**
 * 今日の日付を「yyyy-MM-dd」形式にフォーマットした文字列を取得する
 * @return yyyy-MM-dd
 */
export function getToday(): string {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  return [year, month, day].join("-");
}

/**
 * 「yyyy-MM-dd」形式の日付を「yyyy年MM月dd日」の形式に変換する
 * @param value yyyy-MM-dd
 * @return yyyy年MM月dd日
 */
export function formatDate(value?: string): string {
  const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
  const DATE_PATTERN_FOR_REPLACE = /(\d{4})-(\d{2})-(\d{2})/;

  if (value === null || value === undefined) {
    return "";
  }

  if (!value.match(DATE_PATTERN)) {
    return value;
  }

  return value.replace(DATE_PATTERN_FOR_REPLACE, "$1年$2月$3日");
}

/** 「yyyy-MM-dd」形式の日付をDaetに変換する */
export function toDate(value: string): Date {
  var array = value.split("-");
  return new Date(
    parseInt(array[0]),
    parseInt(array[1]) - 1,
    parseInt(array[2])
  );
}

/** 誕生日「yyyy-MM-dd」から年齢を計算する */
export function getAge(value: string): number {
  // 誕生日を分解
  var birthDate = toDate(value);
  const birthYear = birthDate
    .getFullYear()
    .toString()
    .padStart(4, "0");
  const birthMonth = (birthDate.getMonth() + 1).toString().padStart(2, "0");
  const birthDay = birthDate
    .getDate()
    .toString()
    .padStart(2, "0");
  const birthDateNumber = Number(birthYear + birthMonth + birthDay);

  // 今日の日付を分解
  const todayDate = new Date();
  const todayYear = todayDate
    .getFullYear()
    .toString()
    .padStart(4, "0");
  const todayMonth = (todayDate.getMonth() + 1).toString().padStart(2, "0");
  const todayDay = todayDate
    .getDate()
    .toString()
    .padStart(2, "0");
  const todayDateNumber = Number(todayYear + todayMonth + todayDay);

  // 年齢計算
  return Math.floor((todayDateNumber - birthDateNumber) / 10000);
}
