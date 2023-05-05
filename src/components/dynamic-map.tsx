import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ChangeMapView from "@/utils/changeMapVeiw";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
const bicycleMarker = new Icon({
  iconUrl: require("../bicycle-marker.svg"),
  iconSize: [32, 32],
});

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
      <Marker icon={bicycleMarker} position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ChangeMapView coords={position} />
    </MapContainer>
  );
};

export default DynamicMap;
