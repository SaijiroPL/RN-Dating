/** デートスポットリスト要素(簡易) */
export interface ISpot {
  spot_name: string;
  latitude: number;
  longitude: number;
}

/** デートプラン一覧取得APIレスポンス要素 */
export interface IPlan {
  plan_id: string;
  title: string;
  description: string;
  create_date: string;
  spots: Array<ISpot>;
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
  like_count: number;
  comment_count: number;
}

/** デートプラン一覧取得APIレスポンス */
export interface IPlanList {
  total: number;
  plan_list: Array<IPlan>;
}

/** デートスポットリスト要素(詳細) */
export interface ISpotFull {
  spot_name: string;
  latitude: number;
  longitude: number;
  order: number;
  need_time: number;
  place_id: string;
}

/** デートプラン詳細取得APIレスポンス */
export interface IPlanFull {
  plan_id: string;
  title: string;
  description: string;
  date: string;
  transportation: Array<string>;
  need_time: number;
  create_date: string;
  spots: Array<ISpotFull>;
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  is_follow: boolean;
}
