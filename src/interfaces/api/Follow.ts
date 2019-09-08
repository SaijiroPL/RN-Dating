/**
 * フォロー一覧取得レスポンスインタフェース
 * @author kotatanaka
 */
export interface FollowList {
  total: number;
  follow_list: Array<Follow>;
}

/**
 * フォロワー一覧取得レスポンスインタフェース
 * @author kotatanaka
 */
export interface FollowerList {
  total: number;
  follower_list: Array<Follow>;
}

/**
 * フォロー/フォロワー一覧取得レスポンス要素インタフェース
 * @author kotatanaka
 */
export interface Follow {
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
  plan_count: number;
  follow_date: string;
}
