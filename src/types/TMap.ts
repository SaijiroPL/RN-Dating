/**
 * 位置情報インターフェース
 * @author kotatanaka
 */
export interface Region {
  longitude: number;
  latitude: number;
  longitudeDelta: number;
  latitudeDelta: number;
}
