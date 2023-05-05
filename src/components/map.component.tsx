import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { GpsDataType } from "@/interfaces";
const DynamicMap = dynamic(() => import("./dynamic-map"), {
  ssr: false,
});

const Map = ({
  running,
  gpsData,
}: {
  running: boolean;
  gpsData: GpsDataType;
}) => {
  const [position, setPosition] = useState<[number, number]>([
    gpsData.latitude!,
    gpsData.longitude!,
  ]);

  useEffect(() => {
    if (running) {
      setPosition([gpsData.latitude!, gpsData.longitude!]);
    }
  }, [gpsData, running]);

  return (
    <div className="w-96 h-96" id="map">
      <DynamicMap position={position} />
    </div>
  );
};

export default Map;
