import { useMemo, useState, useEffect } from "react";
import { GpsDataType } from "@/interfaces";
import DashCell from "./dash-cell.component";
import useDistance from "@/utils/useDistance";

const Dash = ({
  seconds,
  gpsData,
}: {
  seconds: number;
  gpsData: GpsDataType;
}) => {
  const { speed } = gpsData;
  const time = useMemo(
    () => new Date(seconds * 1000).toISOString().substring(11, 21),
    [seconds]
  );
  const [distance] = useDistance({ gpsData });
  const avgSpeed = useMemo(
    () => (seconds ? (distance / seconds) * 3.6 : 0.0),
    [distance, seconds]
  );
  const [maxSpeed, setMaxSpeed] = useState<number>(0.0);

  useEffect(() => {
    if (speed) {
      const newMaxSpeed = maxSpeed > speed ? maxSpeed : speed;
      setMaxSpeed(newMaxSpeed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  return (
    <div className="h-full w-full text-gray font-sans">
      <div className="h-1/2 grid grid-cols-2">
        <DashCell
          title={"Speed (KPH)"}
          data={speed ? (speed * 3.6).toFixed(2) : "0.00"}
        />
        <DashCell title={"Time"} data={time} />
      </div>
      <div className="h-1/2 grid grid-cols-3">
        <DashCell title={"Dist (KM)"} data={(distance / 1000).toFixed(2)} />
        <DashCell title={"Avg. (KPH)"} data={avgSpeed.toFixed(2)} />
        <DashCell title={"Max (KPH)"} data={maxSpeed.toFixed(2)} />
      </div>
    </div>
  );
};

export default Dash;
