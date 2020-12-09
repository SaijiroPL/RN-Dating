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
  IGoogleDirection,
  IGooglePrediection,
  IGoogleAutoCompleteResult,
} from 'app/src/interfaces/app/Map';
import { LatLng } from 'react-native-maps';

export const useGooglePlace = () => {
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [distanceMatrix, setDistanceMatrix] = useState<IGoogleMatrixResult>();
  const [direction, setDirection] = useState<IGoogleDirection>();
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const [predictions, setPredictions] = useState<IGooglePrediection[]>([]);
  const placeUrl = GOOGLE_MAP_ENDPOINT.PLACE;
  const distanceUrl = GOOGLE_MAP_ENDPOINT.DISTANCE;
  const directionUrl = GOOGLE_MAP_ENDPOINT.DIRECTION;
  const autoUrl = GOOGLE_MAP_ENDPOINT.AUTO;
  const baseUrl = GOOGLE_MAP_ENDPOINT.BASE;
  const API_KEY = GOOGLE_MAP_ENDPOINT.KEY;

  const searchNearbyPlace = async (
    location: LatLng,
    radius: number,
    type?: string,
  ): Promise<void> => {
    setNextToken(undefined);
    let url = `${placeUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&rankby=prominence&language=ja&key=${API_KEY}`;
    if (type) {
      url = `${placeUrl}/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
    }
    const { data } = await axios.get<IGoogleResult>(url);
    // if (data.results) setPlaces((prev) => prev.concat(data.results));
    if (data.results) setPlaces(data.results);
    setNextToken(data.next_page_token);
  };

  const getDistanceMatrix = async (
    placeIDs: string[],
    mode: string,
  ): Promise<void> => {
    const url = `${distanceUrl}/json?origins=${placeIDs.join(
      '|',
    )}&destinations=${placeIDs.join('|')}&mode=${mode}&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleMatrixResult>(url);
    setDistanceMatrix(data);
  };

  const getDirection = async (
    origin: string,
    destination: string,
    mode: string,
  ): Promise<IGoogleDirection> => {
    const url = `${directionUrl}/json?origin=place_id:${origin}&destination=place_id:${destination}&mode=${mode}&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleDirection>(url);
    setDirection(data);

    return data;
  };

  const getDirectionByLocation = async (
    origin: string,
    destination: string,
    mode: string,
  ): Promise<IGoogleDirection> => {
    const url = `${directionUrl}/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${API_KEY}`;
    console.log(url);
    const { data } = await axios.get<IGoogleDirection>(url);
    setDirection(data);

    return data;
  };

  const getNextPlaces = async (token: string): Promise<void> => {
    const url = `${placeUrl}/nearbysearch/json?pagetoken=${token}&key=${API_KEY}`;
    const { data } = await axios.get<IGoogleResult>(url);
    console.log(url, data);
    if (data.results) setPlaces((prev) => prev.concat(data.results));
    if (data.next_page_token) setNextToken(data.next_page_token);
    else setNextToken(undefined);
  };

  const getPlacePhoto = (photoreference: string) => {
    return `${placeUrl}/photo?maxwidth=400&photoreference=${photoreference}&key=${API_KEY}`;
  };

  const getPlaceOpeningHours = async (
    placeId: string,
  ): Promise<IPlaceOpenHour | undefined> => {
    const url = `${placeUrl}/details/json?place_id=${placeId}&fields=opening_hours&key=${API_KEY}`;

    const { data } = await axios.get<IGoogleResult>(url);
    if (data.result && data.result.opening_hours) {
      return data.result.opening_hours;
    }

    return undefined;
  };

  const getPlaceDetail = async (
    placeId: string,
  ): Promise<IPlace | undefined> => {
    const url = `${placeUrl}/details/json?place_id=${placeId}&key=${API_KEY}&language=ja`;

    const { data } = await axios.get<IGoogleResult>(url);
    if (data.result) {
      return data.result;
    }

    return undefined;
  };

  const getAutoComplete = async (
    input: string,
    location: LatLng,
    radius: number,
  ): Promise<void> => {
    const strLocation = `${location.latitude},${location.longitude}`;
    const url = `${autoUrl}?key=${API_KEY}&input=${input}&location=${strLocation}&origin=${strLocation}&radius=${radius}&language=ja&components=country:jp`;
    const { data } = await axios.get<IGoogleAutoCompleteResult>(url);

    const org = [...data.predictions];
    const sorted = [];
    while (org.length > 0) {
      let minIdx = 0;
      let minVal = org[0].distance_meters;
      for (let i = 1; i < org.length; i += 1) {
        if (org[i].distance_meters < minVal) {
          minIdx = i;
          minVal = org[i].distance_meters;
        }
      }
      sorted.push(org[minIdx]);
      org.splice(minIdx, 1);
    }

    setPredictions(sorted);
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
    places,
    setPlaces,
    getDistanceMatrix,
    distanceMatrix,
    setDistanceMatrix,
    getDirection,
    getDirectionByLocation,
    direction,
    getPlacePhoto,
    getPlaceOpeningHours,
    getNextPlaces,
    getPlaceDetail,
    formatPlaceOpeningHours,
    nextToken,
    API_KEY,
    placeUrl,
    getAutoComplete,
    predictions,
    setPredictions,
  };
};
