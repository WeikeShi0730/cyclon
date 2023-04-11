import { GpsDataType } from "@/interfaces";

const Dash = ({
  seconds,
  gpsData,
}: {
  seconds: number;
  gpsData: GpsDataType;
}) => {
  const time = new Date(seconds * 1000).toISOString().substring(11, 21);
  return (
    <div>
      <div className="">Latitude: {gpsData.latitude?.toFixed(2)}</div>
      <div className="">Longitude: {gpsData.longitude?.toFixed(2)}</div>
      <div className="">Altitude: {gpsData.altitude?.toFixed(2)}</div>
      <div className="">Speed: {gpsData.speed?.toFixed(2)} m/s</div>
      <div className="">Time: {time}</div>
    </div>
  );
};

export default Dash;
