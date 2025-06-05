import { useIsMobileView } from "@/hooks/use-mobile-view";
import { Position } from "@/lib/types";
import { ReactNode } from "react";

export default function ResponsiveRender(props: {
  children: ReactNode;
  desktopPosition: Position;
  mobilePosition: Position;
}) {
  const isMobileView = useIsMobileView();

  function desktopPositionClasses() {
    if (props.desktopPosition === "TOP-LEFT") return "top-4 left-4";
    else if (props.desktopPosition === "TOP-RIGHT") return "top-4 right-4";
    else if (props.desktopPosition === "BOTTOM-LEFT") return "bottom-4 left-4";
    else if (props.desktopPosition === "BOTTOM-RIGHT")
      return "bottom-4 right-4";
  }

  function mobilePositionClasses() {
    if (props.mobilePosition === "BOTTOM-CENTER") return "bottom-0";
    else if (props.mobilePosition === "TOP-CENTER") return "p-2";
  }

  if (isMobileView) {
    return (
      <div className={`fixed z-[1000] w-screen ${mobilePositionClasses()}`}>
        {props.children}
      </div>
    );
  }

  return (
    <div className={`absolute z-[1000] w-[400px] ${desktopPositionClasses()}`}>
      {props.children}
    </div>
  );
}
