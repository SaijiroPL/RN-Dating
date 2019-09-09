/**
 * デートプランお気に入り登録者一覧取得APIレスポンス要素
 * @author kotatanaka
 */
export interface ILikeUser {
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
}

/**
 * デートプランお気に入り登録者一覧取得APIレスポンス
 * @author kotatanaka
 */
export interface ILikeUserList {
  total: number;
  liked_user_list: Array<ILikeUser>;
}