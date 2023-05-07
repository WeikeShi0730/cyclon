import { useState, useEffect } from "react";
import { GpsDataType } from "@/interfaces";
import { getPreciseDistance } from "geolib";

const useDistance = ({ gpsData }: { gpsData: GpsDataType }) => {
  const [distance, setDistance] = useState<number>(0);
  const [prevCoords, setPrevCoords] = useState<any>(null);

  useEffect(() => {
    if (gpsData && gpsData.longitude !== 0 && gpsData.latitude !== 0) {
      console.log(gpsData);
      const coords: { latitude: number; longitude: number } = {
        latitude: gpsData.latitude!,
        longitude: gpsData.longitude!,
      };
      if (prevCoords && coords) {
        const totalDistance = getPreciseDistance(prevCoords, coords);
        setDistance((distance) => distance + totalDistance);
      }
      setPrevCoords(coords);
    }
  }, [gpsData]);

  return [distance];
};

export default useDistance;
