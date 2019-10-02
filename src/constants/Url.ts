import Constants from "expo-constants";

const HOST = Constants.manifest.extra.apiEndpoint;

/**
 * APIエンドポイント
 */
export const API_ENDPOINT = {
  // ユーザー登録
  USERS: HOST + "/users",
  // ユーザー詳細取得, プロフィール編集
  USER: HOST + "/users/$1",
  // メールアドレスでログイン
  USERS_LOGIN: HOST + "/users/login",
  // フォローリスト取得
  USER_FOLLOWS: HOST + "/users/$1/follows",
  // フォロワーリスト取得
  USER_FOLLOWERS: HOST + "/users/$1/followers",
  // デートプラン一覧取得
  PLANS: HOST + "/plans",
  // デートプラン検索
  PLANS_SEARCH: HOST + "/plans/search",
  // デートプラン詳細取得, デートプラン編集, デートプラン削除
  PLAN: HOST + "/plans/$1",
  // コメント一覧取得
  PLAN_COMMENTS: HOST + "/plans/$1/comments",
  // お気に入り登録者一覧取得
  PLAN_LIKES: HOST + "/plans/$1/likes"
};
