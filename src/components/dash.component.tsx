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
        <DashCell title={"Speed (KPH)"} data={speed} />
        <DashCell title={"Time"} data={time} />
      </div>
      <div className="h-1/2 grid grid-cols-3">
        <DashCell title={"Dist (KM)"} data={distance} />
        <DashCell title={"Avg. (KPH)"} data={avgSpeed} />
        <DashCell title={"Max (KPH)"} data={maxSpeed} />
      </div>
    </div>
  );
};

export default Dash;
