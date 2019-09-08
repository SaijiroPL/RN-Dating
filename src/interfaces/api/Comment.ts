/**
 * コメント一覧取得APIレスポンス要素
 * @author kotatanaka
 */
export interface IComment {
  comment_id: string;
  comment: string;
  create_date: string;
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
}

/**
 * コメント一覧取得APIレスポンス
 * @author kotatanaka
 */
export interface ICommentList {
  total: number;
  comment_list: Array<IComment>;
}
