/**
 * よくある質問一覧取得APIレスポンス要素
 * @author kotatanaka
 */
export interface IFaq {
  question_id: number;
  question: string;
  answer: string;
}

/**
 * よくある質問一覧取得APIレスポンス
 * @author kotatanaka
 */
export interface IFaqList {
  question_list: Array<IFaq>;
}
