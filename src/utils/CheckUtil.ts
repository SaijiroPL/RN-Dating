/**
 * nullまたはundefinedでないかをチェックする
 * @author kotatanaka
 */
export function isNotNullOrUndefined(value?: any): boolean {
  return value !== null && value !== undefined;
}
