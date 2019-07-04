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
