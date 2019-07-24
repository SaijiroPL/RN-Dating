/**
 * デートプラン一覧取得レスポンスインターフェース
 * @author kotatanaka
 */
export interface PlanList {
  total: number;
  plan_list: Array<Plan>;
}

/**
 * APIエラーレスポンスインターフェース
 * @author kotatanaka
 */
export interface BadRequestError {
  code: number;
  message: string;
  detail_massage: Array<String>;
}

/**
 * デートプラン一覧取得レスポンス要素インターフェース
 * @author kotatanaka
 */
export interface Plan {
  plan_id: string;
  title: string;
  description: string;
  create_date: string;
  spots: Array<Spot>;
  user_name: string;
  user_attr: string;
  user_image_url: string;
  like_count: number;
  comment_count: number;
}

/**
 * デートプラン詳細取得レスポンスインタフェース
 * @author kotatanaka
 */
export interface PlanFull {
  plan_id: string;
  title: string;
  description: string;
  date: string;
  transportation: Array<string>;
  need_time: number;
  create_date: string;
  spots: Array<SpotFull>;
  user_name: string;
  user_attr: string;
  user_image_url: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
}

/**
 * デートスポットインタフェース(簡易)
 * @author kotatanaka
 */
export interface Spot {
  spot_name: string;
  latitude: number;
  longitude: number;
}

/**
 * デートスポットインタフェース(詳細)
 * @author kotatanaka
 */
export interface SpotFull {
  spot_name: string;
  latitude: number;
  longitude: number;
  order: number;
  need_time: number;
}

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
}

/**
 * 位置情報インターフェース
 * @author kotatanaka
 */
export interface Region {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}
