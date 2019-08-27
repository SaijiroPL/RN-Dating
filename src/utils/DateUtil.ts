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
