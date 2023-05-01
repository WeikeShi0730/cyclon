import { useMap } from "react-leaflet";

function ChangeMapView({ coords }: { coords: any }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

export default ChangeMapView;
