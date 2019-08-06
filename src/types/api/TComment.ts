/**
 * コメント一覧取得レスポンスインタフェース
 * @author kotatanaka
 */
export interface CommentList {
  total: number;
  comment_list: Array<Comment>;
}

/**
 * コメント一覧取得レスポンス要素インタフェース
 * @author kotatanaka
 */
export interface Comment {
  comment_id: string;
  comment: string;
  create_date: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
}
