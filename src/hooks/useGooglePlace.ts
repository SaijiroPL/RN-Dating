/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import axios from 'axios';
import { GOOGLE_MAP_ENDPOINT } from 'app/src/constants/Url';
// from app
import {
  IPlace,
  IPlaceOpenHour,
  IGoogleResult,
  IGoogleMatrixResult,
} from 'app/src/interfaces/app/Map';
import { LatLng } from 'react-native-maps';

export const useGooglePlace = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [distanceMatrix, setDistanceMatrix] = useState<IGoogleMatrixResult>();
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const baseUrl = GOOGLE_MAP_ENDPOINT.PLACE;
  const distanceUrl = GOOGLE_MAP_ENDPOINT.DISTANCE;
  const API_KEY = GOOGLE_MAP_ENDPOINT.KEY;

  const searchNearbyPlace = async (
    location: LatLng,
    radius: number,
    type?: string,
  ): Promise<void> => {
    setNextToken(undefined);
    let url = `${baseUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&rankby=prominence&language=ja&key=${API_KEY}`;
    if (type) {
      url = `${baseUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
    }
    const { data } = await axios.get<IGoogleResult>(url);
    // if (data.results) setPlaces((prev) => prev.concat(data.results));
    if (data.results) setPlaces(data.results);
    setNextToken(data.next_page_token);
  };

  const getDistanceMatrix = async (placeIDs: string[]): Promise<void> => {
    const url = `${distanceUrl}/json?origins=${placeIDs.join(
      '|',
    )}&destinations=${placeIDs.join('|')}&key=${API_KEY}`;
    // console.log(url);
    const { data } = await axios.get<IGoogleMatrixResult>(url);
    setDistanceMatrix(data);
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

  const formatOpHour = (value: string) =>
    `${value.slice(0, 2)}:${value.slice(2, 4)}`;

  function formatPlaceOpeningHours(opHour: IPlaceOpenHour) {
    if (opHour.periods) {
      const dayHour = opHour.periods[0];
      if (dayHour && dayHour.close) {
        return `${formatOpHour(dayHour.open.time)} - ${formatOpHour(
          dayHour.close.time,
        )}`;
      }

      return '24時間営業';
    }

    return '';
  }

  return {
    searchNearbyPlace,
    getPlacePhoto,
    getPlaceOpeningHours,
    getNextPlaces,
    getPlaceDetail,
    formatPlaceOpeningHours,
    getDistanceMatrix,
    distanceMatrix,
    setDistanceMatrix,
    places,
    setPlaces,
    nextToken,
    API_KEY,
    baseUrl,
  };
};
