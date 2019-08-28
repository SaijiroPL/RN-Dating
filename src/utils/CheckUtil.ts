/**
 * nullまたはundefinedでないかをチェックする
 * @param value 任意の値
 * @return boolean
 */
export function isNotNullOrUndefined(value?: any): boolean {
  return value !== null && value !== undefined;
}

/**
 * 空文字かどうかをチェックする
 * @param value 任意の文字列
 * @return boolean
 */
export function isEmpty(value: string): boolean {
  return value === "";
}
