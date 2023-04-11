import { useEffect } from "react";

export const useInterval = (cb: () => void, intvl: number) => {
  useEffect(() => {
    const id = setInterval(cb, intvl);
    return () => clearInterval(id);
  }, [cb, intvl]);
};
