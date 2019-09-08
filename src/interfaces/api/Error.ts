/**
 * APIエラーレスポンス
 * @author kotatanaka
 */
export interface IApiError {
  code: number;
  message: string;
  detail_message: Array<string>;
}
