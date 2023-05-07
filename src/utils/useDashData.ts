import { useState, useEffect, useMemo } from "react";
import { GpsDataType } from "@/interfaces";
import { getPreciseDistance } from "geolib";

type CoordsType = {
  latitude: number;
  longitude: number;
};
const useDashData = ({
  seconds,
  gpsData,
}: {
  seconds: number;
  gpsData: GpsDataType;
}) => {
  const [distance, setDistance] = useState<number>(0);
  const [prevCoords, setPrevCoords] = useState<CoordsType>({
    latitude: 0,
    longitude: 0,
  });
  const [maxSpeed, setMaxSpeed] = useState<number>(0.0);

  const speed: number = gpsData.speed ? gpsData.speed * 3.6 : 0.0;
  const time: string = useMemo(
    () => new Date(seconds * 1000).toISOString().substring(11, 21),
    [seconds]
  );
  const avgSpeed: number = useMemo(
    () => (seconds ? (distance / seconds) * 3.6 : 0.0),
    [distance, seconds]
  );

  useEffect(() => {
    if (gpsData && gpsData.longitude !== 0 && gpsData.latitude !== 0 && speed) {
      const coords: CoordsType = {
        latitude: gpsData.latitude!,
        longitude: gpsData.longitude!,
      };
      if (prevCoords && coords) {
        const totalDistance = getPreciseDistance(prevCoords, coords);
        setDistance((distance) => distance + totalDistance);
      }
      setPrevCoords(coords);

      const newMaxSpeed = maxSpeed > speed ? maxSpeed : speed;
      setMaxSpeed(newMaxSpeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpsData]);

  return [
    speed.toFixed(2),
    time,
    (distance / 1000).toFixed(2),
    avgSpeed.toFixed(2),
    maxSpeed.toFixed(2),
  ];
};

export default useDashData;
