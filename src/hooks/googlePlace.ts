/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import axios from 'axios';

// from app
import { ILocation } from '../interfaces/app/Map';

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
  business_status: string;
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
  opening_hours: any;
  photos: Array<IPlacePhoto>;
  place_id: string;
  reference: string;
  scope: string;
  types: Array<string>;
  vicinity: string;
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
  result?: IPlaceDetail;
  status: string;
}

export const googlePlace = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const baseUrl = 'https://maps.googleapis.com/maps/api/place';
  const API_KEY = 'AIzaSyCsM1NTvST-ahQ3VC8qRJ6l8QUckrjDMRI';

  const searchNearbyPlace = async (
    location: ILocation,
    radius: number,
    type: string,
  ): Promise<void> => {
    setNextToken(undefined);
    const url = `${baseUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleResult>(url);
    if (data.results) {
      setPlaces(Object.assign(data.results));
    }
    setNextToken(data.next_page_token);
  };

  const getNextPlaces = async (token: string): Promise<void> => {
    const url = `${baseUrl}/nearbysearch/json?pagetoken=${token}&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleResult>(url);
    console.log(url, data);
    if (data.results) setPlaces((prev) => prev.concat(data.results));
    if (data.next_page_token) setNextToken(data.next_page_token);
    else setNextToken(undefined);
  };

  const getPlacePhoto = (photoreference: string) => {
    return `${baseUrl}/photo?maxwidth=400&photoreference=${photoreference}&key=${API_KEY}`;
  };

  const formatOpHour = (value: string) =>
    `${value.slice(0, 2)}:${value.slice(2, 4)}`;

  const getPlaceOpeningHours = async (placeId: string): Promise<string> => {
    const url = `${baseUrl}/details/json?place_id=${placeId}&fields=opening_hours&key=${API_KEY}`;

    const { data } = await axios.get<IGoogleResult>(url);
    if (data.result) {
      const dayHour = data.result.opening_hours.periods[0];
      if (dayHour && dayHour.close) {
        return `${formatOpHour(dayHour.open.time)} - ${formatOpHour(
          dayHour.close.time,
        )}`;
      }

      return '24時間営業';
    }

    return '';
  };

  return {
    searchNearbyPlace,
    getPlacePhoto,
    getPlaceOpeningHours,
    getNextPlaces,
    places,
    nextToken,
  };
};
