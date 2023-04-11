import { useEffect } from "react";

export const interval = (intvl: number) => (cb: () => void) => {
  useEffect(() => {
    const id = setInterval(cb, intvl);
    return () => clearInterval(id);
  }, [cb]);
};
