/**
 * 位置情報
 * @author kotatanaka
 */
export interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * 現在位置
 * @author kotatanaka
 */
export interface IHere {
  latitude: number;
  longitude: number;
  timestamp: number;
}

/**
 * 位置マーカー
 * @author kotatanaka
 */
export interface IMarker {
  key?: string;
  latitude: number;
  longitude: number;
  radius: number;
  color: string;
  unit: 'km' | 'm';
}

/**
 * 線
 * @author kotatanaka
 */
export interface ILine {
  latitude: number;
  longitude: number;
}
