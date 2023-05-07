import { GpsDataType } from "@/interfaces";
import DashCell from "./dash-cell.component";
import useDistance from "@/utils/useDashData";

const Dash = ({
  seconds,
  gpsData,
}: {
  seconds: number;
  gpsData: GpsDataType;
}) => {
  const [speed, time, distance, avgSpeed, maxSpeed] = useDistance({
    seconds,
    gpsData,
  });

  return (
    <div className="h-full w-full text-gray font-sans">
      <div className="h-1/2 grid grid-cols-2">
        <DashCell title={"Speed (KPH)"} data={speed ? speed : "0.00"} />
        <DashCell title={"Time"} data={time} />
      </div>
      <div className="h-1/2 grid grid-cols-3">
        <DashCell title={"Dist (KM)"} data={distance ? distance : "0.00"} />
        <DashCell title={"Avg. (KPH)"} data={avgSpeed ? avgSpeed : "0.00"} />
        <DashCell title={"Max (KPH)"} data={maxSpeed ? maxSpeed : "0.00"} />
      </div>
    </div>
  );
};

export default Dash;
