/**
 * 検索履歴一覧取得APIレスポンス
 * @author itsukiyamada
 */
export interface IHistoryList {
  total: number;
  history_list: Array<string>;
}
