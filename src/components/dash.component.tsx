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
  const [speed, time, distance, elevGain, avgSpeed, maxSpeed] = useDistance({
    seconds,
    gpsData,
  });

  return (
    <div className="h-full w-full text-gray font-sans">
      <div className="h-1/3 grid grid-cols-2">
        <DashCell title={"Speed (KPH)"} data={speed} />
        <DashCell title={"Time"} data={time} />
      </div>
      <div className="h-1/3 grid grid-cols-2">
        <DashCell title={"Dist (KM)"} data={distance} />
        <DashCell title={"Elev Gain (M)"} data={elevGain} />
      </div>
      <div className="h-1/3 grid grid-cols-2">
        <DashCell title={"Avg. (KPH)"} data={avgSpeed} />
        <DashCell title={"Max (KPH)"} data={maxSpeed} />
      </div>
    </div>
  );
};

export default Dash;
