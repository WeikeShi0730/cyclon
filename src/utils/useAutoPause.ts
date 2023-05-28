import { useEffect, useState } from "react";

const useAutoPause = (cb: () => void, interval: number, coords: any) => {
  const [speed, setSpeed] = useState<number>(0);
  if (coords && coords.speed) {
    setSpeed(coords.speed);
  }
  useEffect(() => {
    var id: any;
    if (speed === 0) {
      id = setTimeout(cb, interval);
      console.log(id);
    } else {
      () => clearTimeout(id);
    }
    return () => clearTimeout(id);
  }, [cb, interval, speed]);
};

export default useAutoPause;
