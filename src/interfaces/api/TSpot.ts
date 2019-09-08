/**
 * デートスポットインタフェース(簡易)
 * @author kotatanaka
 */
export interface Spot {
  spot_name: string;
  latitude: number;
  longitude: number;
}

/**
 * デートスポットインタフェース(詳細)
 * @author kotatanaka
 */
export interface SpotFull {
  spot_name: string;
  latitude: number;
  longitude: number;
  order: number;
  need_time: number;
}

/**
 * デートスポット候補インタフェース
 * @author kotatanaka
 */
export interface CandidateSpot {
  spotName: string;
  address: string;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
}
