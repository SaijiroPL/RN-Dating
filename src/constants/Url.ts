import Constants from "expo-constants";

const API_HOST = Constants.manifest.extra.apiEndpoint;
const WEB_HOST = Constants.manifest.extra.webEndpoint;

/**
 * APIエンドポイント
 */
export const API_ENDPOINT = {
  // ユーザー登録
  USERS: API_HOST + "/users",
  // ユーザー詳細取得, プロフィール編集
  USER: API_HOST + "/users/$1",
  // メールアドレスでログイン
  USERS_LOGIN: API_HOST + "/users/login",
  // パスワード変更
  USER_PASSWORD: API_HOST + "/users/$1/password",
  // フォローリスト取得
  USER_FOLLOWS: API_HOST + "/users/$1/follows",
  // フォロワーリスト取得
  USER_FOLLOWERS: API_HOST + "/users/$1/followers",
  // 通知一覧取得
  USER_NOTIFICATIONS: API_HOST + "/users/$1/notifications",
  // 運営からのお知らせ一覧取得
  INFORMATION: API_HOST + "/information",
  // よくある質問一覧取得
  QUESTIONS_FAQ: API_HOST + "/questions/faq",
  // デートプラン一覧取得
  PLANS: API_HOST + "/plans",
  // デートプラン検索
  PLANS_SEARCH: API_HOST + "/plans/search",
  // デートプラン詳細取得, デートプラン編集, デートプラン削除
  PLAN: API_HOST + "/plans/$1",
  // コメント一覧取得
  PLAN_COMMENTS: API_HOST + "/plans/$1/comments",
  // お気に入り登録者一覧取得, お気に入り登録, お気に入り解除
  PLAN_LIKES: API_HOST + "/plans/$1/likes"
};

/**
 * WebViewエンドポイント
 */
export const WEB_ENDPOINT = {
  // 利用規約
  TERMS: WEB_HOST + "/webview/terms",
  // プライバシーポリシー
  PRIVACY_POLICY: WEB_HOST + "/webview/privacy"
};
