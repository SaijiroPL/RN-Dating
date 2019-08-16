/**
 * 今日の日付を「yyyy-MM-dd」形式にフォーマットした文字列を取得する
 * @author kotatanaka
 */
export function getToday(): string {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  return [year, month, day].join("-");
}
