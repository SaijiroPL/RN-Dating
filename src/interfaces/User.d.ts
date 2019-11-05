/**
 * ユーザー情報
 * @author kotatanaka
 */
export interface IUserInfo {
  userId: string;
  userName: string;
  userAttr: string;
  userImageUrl: string;
  isFollow?: boolean;
}
