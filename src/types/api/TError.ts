/**
 * API 400エラーレスポンスインターフェース
 * @author kotatanaka
 */
export interface BadRequestError {
  code: number;
  message: string;
  detail_massage: Array<String>;
}
