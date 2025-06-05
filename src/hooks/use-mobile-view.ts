// useIsMobileView.ts
import { MOBILE_VIEW_BREAKPOINT } from "@/lib/constants";
import { useEffect, useState } from "react";

export function useIsMobileView(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_VIEW_BREAKPOINT;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_VIEW_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // trigger once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
