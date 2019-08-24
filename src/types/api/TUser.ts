/**
 * ユーザー情報取得レスポンスインターフェース
 * @author kotatanaka
 */
export interface UserDetail {
  user_id: string;
  name: string;
  sex: string;
  age: number;
  area: string;
  mail_address: string;
  user_attr: string;
  user_image_url: string;
  plan_count: number;
  follow_count: number;
  follower_count: number;
}

/**
 * ユーザー情報インターフェース
 * @author kotatanaka
 */
export interface User {
  userId: string;
  userName: string;
  userAttr: string;
  userImageUrl: string;
}
