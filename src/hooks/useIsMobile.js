import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

export function useIsLowPower() {
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    // Check device memory, cores, connection
    const nav = navigator;
    const cores = nav.hardwareConcurrency || 2;
    const memory = nav.deviceMemory || 4;
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection;
    const saveData = connection?.saveData;

    // Low power if any is true
    setIsLow(cores < 4 || memory < 4 || saveData === true);
  }, []);

  return isLow;
}

export default useIsMobile;