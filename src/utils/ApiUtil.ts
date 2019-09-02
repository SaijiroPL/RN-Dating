import { AxiosError } from "axios";

/**
 * APIが200以外を返した場合のレスポンスを捌く関数
 * @param error AxiosError
 */
export function handleError(error: AxiosError): void {
  if (error.response === undefined) {
    return;
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      console.log("Bad Request Error: " + data.detail_message);
      break;
    case 404:
      console.log("URL Not Found.");
      break;
    case 500:
      console.log("Server Error: " + data.detail_message);
      break;
    default:
      console.log("API Error: " + error.message);
      break;
  }
}
