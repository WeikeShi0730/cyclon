import { GpsDataType } from "@/interfaces";
import DashCell from "./dash-cell.component";

const Dash = ({
  seconds,
  gpsData,
}: {
  seconds: number;
  gpsData: GpsDataType;
}) => {
  const time = new Date(seconds * 1000).toISOString().substring(11, 21);
  return (
    <div className="h-full w-full text-gray font-sans">
      <div className="h-1/2 grid grid-cols-2">
        <DashCell
          title={"Speed (KPH)"}
          data={gpsData.speed ? gpsData.speed.toFixed(2) : "0.00"}
        />
        <DashCell title={"Time"} data={time} />
      </div>
      <div className="h-1/2 grid grid-cols-3">
        <DashCell title={"Dist (KM)"} data={"data"} />
        <DashCell title={"Avg. (KPH)"} data={"data"} />
        <DashCell title={"Max (KPH)"} data={"data"} />
      </div>
    </div>
  );
};

export default Dash;
