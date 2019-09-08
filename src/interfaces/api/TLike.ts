/**
 * デートプランお気に入り登録者一覧取得レスポンスインタフェース
 * @author kotatanaka
 */
export interface LikeUserList {
  total: number;
  liked_user_list: Array<LikeUser>;
}

/**
 * デートプランお気に入り登録者一覧取得レスポンス要素インタフェース
 * @author kotatanaka
 */
export interface LikeUser {
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
}
