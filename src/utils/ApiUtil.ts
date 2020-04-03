import { AxiosError } from 'axios';

// from app
import { IApiError } from 'app/src/interfaces/api/Error';

/**
 * APIが200以外を返した場合のレスポンスを捌く関数
 * @param error AxiosError
 * @return void | エラーメッセージリスト
 */
export function handleError(error: AxiosError<IApiError>): void | IApiError {
  if (error.response === undefined) {
    return;
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      console.log(`[400] Bad Request Error: ${data.detail_message}`);

      return data;
    case 404:
      console.log('[404] URL Not Found.');

      return data;
    case 500:
      console.log(`[500] Server Error: ${data.detail_message}`);

      return data;
    default:
      console.log(`API Error: ${error.message}`);

      return data;
  }
}
