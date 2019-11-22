/**
 * ユーザー情報取得APIレスポンス
 * @author kotatanaka
 */
export interface IUserDetail {
  user_id: string;
  name: string;
  profile: string;
  sex: string;
  age: number;
  area: string;
  address: string;
  mail_address: string;
  user_attr: string;
  user_image_url: string;
  plan_count: number;
  follow_count: number;
  follower_count: number;
  is_follow: boolean;
}

/**
 * ユーザー登録APIリクエストボディ
 * @author kotatanaka
 */
export interface ICreateUserBody {
  name: string;
  sex: string;
  age: number;
  area: string;
  mail_address: string;
  password: string;
}

/**
 * アプリにログインAPIリクエストボディ
 * @author kotatanaka
 */
export interface ILogin {
  mail_address?: string;
  "1did"?: string;
  password: string;
}

/**
 * アプリにログインAPIレスポンス
 * @author kotatanaka
 */
export interface ILoginUser {
  user_id: string;
  name: string;
  user_image_url: string;
}

/**
 * プロフィール編集APIレスポンス
 * @author itsukiyamada, kotatanaka
 */
export interface IUpdateUserBody {
  name?: string;
  profile?: string;
  age?: number;
  area?: string;
  address?: string;
  mail_address?: string;
}

/**
 * パスワード編集APIレスポンス
 * @author itsukiyamada
 */
export interface IUpdatePasswordBody {
  old_password: string;
  new_password: string;
}
