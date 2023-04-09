import Map from "@/components/map.component";
import Dash from "@/components/dash.component";
import PlayButton from "@/components/play-button.component";
import { useTimer } from "@/utils/useTimer";

const Home = () => {
  const [start, pause, stop, reset, running, gpsData] = useTimer();
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-96 bg-slate-300 flex flex-col">
        <div className="h-1/2 flex justify-center items-center">
          <Map running={running} />
        </div>
        <div className="h-1/2 flex justify-center items-center">
          <Dash gpsData={gpsData} />
        </div>
        <div className="flex justify-center items-center">
          <PlayButton start={start} pause={pause} running={running} />
        </div>
      </div>
    </div>
  );
};

export default Home;
