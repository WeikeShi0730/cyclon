import { useEffect } from "react";

export const useInterval = (cb: any, intvl: number) => {
  useEffect(() => {
    const id = setInterval(cb, intvl);
    return () => clearInterval(id);
  }, [cb, intvl]);
};
