import { useState } from "react";
import { useInterval } from "./useInterval";
import { GpsDataType } from "@/interfaces";
import { useGeolocated } from "@/utils/useGeolocation";

const RUNNING_INVTERVAL = 100;
const SECOND_INCREMET = RUNNING_INVTERVAL / 1000;

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

  const runningTimer = () => {
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
  const stop = () => {
    setRunning(false);
    setGps({ latitude: 0, longitude: 0, altitude: 0, speed: 0 });
    setSeconds(0);
  };
  const reset = () => {};

  useInterval(runningTimer, RUNNING_INVTERVAL);

  return [start, pause, stop, reset, running, seconds, gps];
};
