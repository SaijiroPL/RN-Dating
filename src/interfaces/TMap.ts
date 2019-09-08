/**
 * 位置情報インターフェース
 * @author kotatanaka
 */
export interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * 現在位置インターフェース
 * @author kotatanaka
 */
export interface Here {
  latitude: number;
  longitude: number;
  timestamp: number;
}

/**
 * マーカーインターフェース
 * @author kotatanaka
 */
export interface Marker {
  key?: string;
  latitude: number;
  longitude: number;
  radius: number;
  color: string;
  unit: "km" | "m";
}
