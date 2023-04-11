import { useCallback, useState } from "react";
import { useInterval } from "./useInterval";
import { GpsDataType } from "@/interfaces";
import { useGeolocated } from "@/utils/useGeolocation";

export const useTimer = (): [
  () => void,
  () => void,
  () => void,
  () => void,
  boolean,
  GpsDataType
] => {
  const [running, setRunning] = useState<boolean>(false);
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
    //   const testSpeed = Math.random() * 10 + 1;
      setGps({
        latitude,
        longitude,
        altitude,
        speed,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const start = () => {
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
  };
  const stop = () => {};
  const reset = () => {};

  useInterval(timer, 100);

  return [start, pause, stop, reset, running, gps];
};
