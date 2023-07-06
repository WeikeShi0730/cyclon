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
  number,
  GpsDataType
] => {
  const [running, setRunning] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [resumeSeconds, setResumeSeconds] = useState<number>(0);
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
      setSeconds((seconds) => seconds + SECOND_INCREMET);
      setResumeSeconds((resumeSeconds) => resumeSeconds + SECOND_INCREMET);
      setGps({
        latitude,
        longitude,
        altitude,
        speed,
      });
    }
  };

  const start = () => {
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
    setResumeSeconds(0);
  };
  const stop = () => {
    setRunning(false);
    setGps({ latitude: 0, longitude: 0, altitude: 0, speed: 0 });
    setSeconds(0);
    setResumeSeconds(0);
  };
  const reset = () => {};

  useInterval(runningTimer, RUNNING_INVTERVAL);

  return [start, pause, stop, reset, running, seconds, resumeSeconds, gps];
};
