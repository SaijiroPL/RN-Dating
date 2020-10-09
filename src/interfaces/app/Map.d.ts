/** 位置情報 */
export interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/** 現在位置 */
export interface IHere {
  latitude: number;
  longitude: number;
  timestamp: number;
}

/** 位置マーカー */
export interface IMarker {
  key?: string;
  latitude: number;
  longitude: number;
  radius: number;
  color: string;
  unit: 'km' | 'm';
}

/** 線 */
export interface ILine {
  latitude: number;
  longitude: number;
}

export interface ISimpleLocation {
  lat: number;
  lng: number;
}

export interface IPlacePhoto {
  width: number;
  height: number;
  html_attributions: Array<string>;
  photo_reference: string;
}

export interface IPlace {
  geometry: {
    location: ISimpleLocation;
    viewport: {
      northeast: ISimpleLocation;
      southwest: ISimpleLocation;
    };
  };
  icon: string;
  id: string;
  name: string;
  opening_hours: IPlaceOpenHour;
  photos: Array<IPlacePhoto>;
  place_id: string;
  types: Array<string>;
  vicinity: string;
  user_ratings_total: number;
}

export interface IPlaceOpenHour {
  open_now: boolean;
  periods: IPlaceDayHour[];
  weekday_text: string[];
}

export interface IPlaceDayHour {
  open: {
    day: number;
    time: string;
  };
  close?: {
    day: number;
    time: string;
  };
}

export interface IPlaceDetail {
  opening_hours: {
    open_now: boolean;
    periods: IPlaceDayHour[];
    weekday_text: string[];
  };
}

export interface IGoogleResult {
  html_attributions: string;
  next_page_token?: string;
  results?: IPlace[];
  result?: IPlace;
  status: string;
}

export interface IGoogleMatrixResult {
  status: string;
  origin_addresses: string[];
  destination_addresses: string[];
  rows: IGoogleMatrixRow[];
}

export interface IGoogleMatrixRow {
  elements: {
    status: string;
    duration: {
      value: number;
      text: string;
    };
    distance: {
      value: number;
      text: string;
    };
  }[];
}
