/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import axios from 'axios';
import { GOOGLE_MAP_ENDPOINT } from 'app/src/constants/Url';
// from app
import {
  ILocation,
  IPlace,
  IPlaceOpenHour,
  IGoogleResult,
} from 'app/src/interfaces/app/Map';

export const useGooglePlace = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const baseUrl = GOOGLE_MAP_ENDPOINT.PLACE;
  const API_KEY = GOOGLE_MAP_ENDPOINT.KEY;

  const searchNearbyPlace = async (
    location: ILocation,
    radius: number,
    type: string,
  ): Promise<void> => {
    setNextToken(undefined);
    const url = `${baseUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleResult>(url);
    if (data.results) {
      setPlaces(data.results);
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

  const getPlaceOpeningHours = async (
    placeId: string,
  ): Promise<IPlaceOpenHour | undefined> => {
    const url = `${baseUrl}/details/json?place_id=${placeId}&fields=opening_hours&key=${API_KEY}`;

    const { data } = await axios.get<IGoogleResult>(url);
    if (data.result && data.result.opening_hours) {
      return data.result.opening_hours;
    }

    return undefined;
  };

  const getPlaceDetail = async (
    placeId: string,
  ): Promise<IPlace | undefined> => {
    const url = `${baseUrl}/details/json?place_id=${placeId}&key=${API_KEY}`;

    const { data } = await axios.get<IGoogleResult>(url);
    if (data.result) {
      return data.result;
    }

    return undefined;
  };

  return {
    searchNearbyPlace,
    getPlacePhoto,
    getPlaceOpeningHours,
    getNextPlaces,
    getPlaceDetail,
    places,
    setPlaces,
    nextToken,
    API_KEY,
    baseUrl,
  };
};
