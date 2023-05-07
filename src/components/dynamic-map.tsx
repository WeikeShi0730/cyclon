import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ChangeMapView from "@/utils/changeMapVeiw";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const DynamicMap = ({ position }: { position: [number, number] }) => {
  return (
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
      <Marker
        icon={
          new Icon({
            iconUrl: "/bicycle-marker.svg",
            iconSize: [35, 35],
            iconAnchor: [12, 41],
          })
        }
        position={position}
      />
      <ChangeMapView coords={position} />
    </MapContainer>
  );
};

export default DynamicMap;
