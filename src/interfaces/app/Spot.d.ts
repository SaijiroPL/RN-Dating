/** デートスポット候補 */
export interface ICandidateSpot {
  spotName: string;
  address: string;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
}
