/**
 * デートプラン一覧取得レスポンスインターフェース
 * @author kotatanaka
 */
export interface PlanList {
  total: number;
  plan_list: Array<Plan>;
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
  representative_spot: string;
  user_name: string;
  user_image_url: string;
  like_count: number;
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
  spots: Array<Spot>;
  user_name: string;
  user_image_url: string;
  like_count: number;
  is_liked: boolean;
}

/**
 * デートスポットインタフェース
 * @author kotatanak
 */
export interface Spot {
  google_maps_key: string;
  order: number;
  need_time: number;
}
