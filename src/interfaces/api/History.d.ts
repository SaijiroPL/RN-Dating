/**
 * 検索履歴リスト要素
 * @author kotatanaka
 */
export interface IHistory {
  history_id: number;
  word: string;
  search_date: string;
}

/**
 * 検索履歴一覧取得APIレスポンス
 * @author itsukiyamada
 */
export interface IHistoryList {
  total: number;
  history_list: Array<IHistory>;
}
