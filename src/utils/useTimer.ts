import { useState, useCallback } from "react";
import { useInterval } from "./useInterval";
import { GpsDataType } from "@/interfaces";
import { useGeolocated } from "@/utils/useGeolocation";

const INVTERVAL = 100;
const SECOND_INCREMET = INVTERVAL / 1000;

export const useTimer = (): [
  () => void,
  () => void,
  () => void,
  () => void,
  boolean,
  number,
  GpsDataType
] => {
  const [running, setRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [gps, setGps] = useState<GpsDataType>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    speed: 0,
  });
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });

  const timer = () => {
    if (running && isGeolocationAvailable && isGeolocationEnabled && coords) {
      const { latitude, longitude, altitude, speed } = coords;
      setGps({
        latitude,
        longitude,
        altitude,
        speed,
      });
      setSeconds((seconds) => seconds + SECOND_INCREMET);
    }
  };

  const start = () => {
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
  };
  const stop = () => {};
  const reset = () => {};

  useInterval(timer, INVTERVAL);

  return [start, pause, stop, reset, running, seconds, gps];
};
