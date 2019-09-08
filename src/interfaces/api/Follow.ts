/**
 * フォロー/フォロワー一覧取得APIレスポンス要素
 * @author kotatanaka
 */
export interface IFollow {
  user_id: string;
  user_name: string;
  user_attr: string;
  user_image_url: string;
  plan_count: number;
  follow_date: string;
}

/**
 * フォロー一覧取得APIレスポンス
 * @author kotatanaka
 */
export interface IFollowList {
  total: number;
  follow_list: Array<IFollow>;
}

/**
 * フォロワー一覧取得APIレスポンス
 * @author kotatanaka
 */
export interface IFollowerList {
  total: number;
  follower_list: Array<IFollow>;
}
