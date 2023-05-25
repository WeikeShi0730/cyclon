import { useEffect } from "react";

const useAutoPause = (cb: () => void, interval: number) => {
  useEffect(() => {
    const id = setTimeout(cb, interval);
    return () => clearTimeout(id);
  }, [cb, interval]);
};

export default useAutoPause;
