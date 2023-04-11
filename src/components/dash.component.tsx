import { GpsDataType } from "@/interfaces";

const Dash = ({ gpsData }: { gpsData: GpsDataType }) => {
  // console.log(gpsData.speed?.toFixed(2));
  return (
    <div>
      <div className="">Latitude: {gpsData.latitude?.toFixed(2)}</div>
      <div className="">Longitude: {gpsData.longitude?.toFixed(2)}</div>
      <div className="">Altitude: {gpsData.altitude?.toFixed(2)}</div>
      <div className="">Speed: {gpsData.speed?.toFixed(2)} m/s</div>
    </div>
  );
};

export default Dash;
