import Map from "@/components/map.component";
import Dash from "@/components/dash.component";
import Control from "@/components/control.component";
import { useTimer } from "@/utils/useTimer";
import useAutoPause from "@/utils/useAutoPause";

const Home = () => {
  const [start, pause, stop, reset, running, seconds, gpsData] = useTimer();
  // useAutoPause(running, gpsData, start, pause);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-96 bg-white flex flex-col">
        <div className="h-1/2 flex justify-center items-center">
          <Map running={running} gpsData={gpsData} />
        </div>
        <div className="h-1/2 flex justify-center items-center">
          <Dash seconds={seconds} gpsData={gpsData} />
        </div>
        <div className="flex justify-center items-center">
          <Control
            start={start}
            pause={pause}
            stop={stop}
            seconds={seconds}
            running={running}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
