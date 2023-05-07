import { useState, useEffect } from "react";
import { GpsDataType } from "@/interfaces";
import { getDistance } from "geolib";

const useDistance = ({ gpsData }: { gpsData: GpsDataType }) => {
  const [distance, setDistance] = useState<number>(0);
  const [prevCoords, setPrevCoords] = useState<any>(null);

  useEffect(() => {
    const coords: { latitude: number; longitude: number } = {
      latitude: gpsData.latitude!,
      longitude: gpsData.longitude!,
    };
    if (prevCoords && coords) {
      const totalDistance = getDistance(prevCoords, coords);
      setDistance((distance) => distance + totalDistance);
    }
    setPrevCoords(coords);
  }, [gpsData, prevCoords]);

  return [distance];
};

export default useDistance;
