import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { GpsDataType } from "@/interfaces";
const ChangeMapView = dynamic(() => import("../utils/changeMapVeiw"), {
  ssr: false,
});
const MapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((module) => module.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((module) => module.Marker),
  { ssr: false }
);

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
    <div className="w-96 h-96">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={position}
        zoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
        <ChangeMapView coords={position} />
      </MapContainer>
    </div>
  );
};

export default Map;
