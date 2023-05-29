import { useEffect, useState } from "react";

const AUTO_PAUSE_INTERVAL = 5000;
const useAutoPause = (
  running: boolean,
  coords: any,
  start: () => void,
  pause: () => void
) => {
  const [speed, setSpeed] = useState<number>(0);
  if (coords && coords.speed) {
    setSpeed(coords.speed);
  }
  useEffect(() => {
    var id: any;
    if (running && speed === 0) {
      console.log(speed);
      id = setTimeout(() => {
        pause();
      }, AUTO_PAUSE_INTERVAL);
    } else if (!running && speed !== 0) {
      start();
      clearTimeout(id);
    }
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speed]);
};

export default useAutoPause;
