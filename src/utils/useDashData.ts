import { useState, useEffect, useMemo } from "react";
import { GpsDataType } from "@/interfaces";
import { getPreciseDistance } from "geolib";

type CoordsType = {
  latitude: number;
  longitude: number;
};
const useDashData = ({
  seconds,
  resumeSeconds,
  gpsData,
}: {
  seconds: number;
  resumeSeconds: number;
  gpsData: GpsDataType;
}) => {
  const [speed, setSpeed] = useState<number>(0.0);
  const [distance, setDistance] = useState<number>(0.0);
  const [elev, setElev] = useState<number>(0.0);
  const [elevGain, setElevGain] = useState<number>(0.0);
  const [prevCoords, setPrevCoords] = useState<CoordsType | null>(null);
  const [maxSpeed, setMaxSpeed] = useState<number>(0.0);
  const [avgSpeed, setAvgSpeed] = useState<number>(0.0);

  const time: string = useMemo(
    () => new Date(seconds * 1000).toISOString().substring(11, 21),
    [seconds]
  );

  useEffect(() => {
    if (
      gpsData &&
      gpsData.longitude !== 0 &&
      gpsData.latitude !== 0 &&
      gpsData.speed &&
      gpsData.altitude
    ) {
      const coords: CoordsType = {
        latitude: gpsData.latitude!,
        longitude: gpsData.longitude!,
      };
      const currentElev: number = gpsData.altitude;

      setPrevCoords(coords);
      setElev(currentElev);

      if (resumeSeconds >= 3) {
        // Discard first 5 seconds of data after resuming

        /** Distance */
        if (prevCoords && coords) {
          const newDistance: number = getPreciseDistance(prevCoords, coords);
          setDistance((distance) => distance + newDistance);
        }

        /** Elevation */
        if (elev && elev !== 0) {
          const newElevGain: number =
            currentElev - elev > 0 ? currentElev - elev : 0;
          setElevGain((elevGain) => elevGain + newElevGain);
        }

        /** Current Speed */
        const currSpeed: number = gpsData.speed * 3.6;
        setSpeed(currSpeed);

        /** Max Speed */
        const newMaxSpeed: number = maxSpeed > currSpeed ? maxSpeed : currSpeed;
        setMaxSpeed(newMaxSpeed);

        /** Avg Speed */
        const avgSpeed: number = seconds ? (distance / seconds) * 3.6 : 0.0;
        setAvgSpeed(avgSpeed);
      }
    } else if (
      // If reset or no gpsData
      gpsData.longitude === 0 &&
      gpsData.latitude === 0 &&
      gpsData.speed === 0 &&
      gpsData.altitude === 0
    ) {
      setDistance(0);
      setElevGain(0);
      setSpeed(0);
      setMaxSpeed(0);
      setAvgSpeed(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpsData]);

  return [
    speed.toFixed(2),
    time,
    (distance / 1000).toFixed(2),
    elevGain.toFixed(2),
    avgSpeed.toFixed(2),
    maxSpeed.toFixed(2),
  ];
};

export default useDashData;
