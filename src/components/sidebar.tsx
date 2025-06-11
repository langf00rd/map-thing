import { useGlobalStore } from "@/lib/store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";

export default function SidebarPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalStore = useGlobalStore();
  const [show, setShow] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  function toggleShow() {
    setShow((prev) => !prev);
  }

  useEffect(() => {
    const el = document.getElementById("overlay-root");
    if (el) setContainer(el);
  }, []);

  useEffect(() => {
    if (globalStore.isLocationSearchInputInFocus) setShow(true);
  }, [globalStore.isLocationSearchInputInFocus]);

  if (!container) return null;

  return createPortal(
    <div
      className={`p-3 fixed z-[9999] md:w-[400px] w-screen rounded-t-2xl md:rounded-t-none md:h-screen bottom-0 md:top-0 left-0 md:bg-transparent bg-white ${show ? "h-[70vh]" : "h-[15vh]"}`}
    >
      <div className="w-max mx-auto md:hidden mb-2">
        <Button
          size="sm"
          variant="secondary"
          className="rounded-full"
          onClick={toggleShow}
        >
          {show ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
      <div className="map__overlay_card flex md:p-3 md:pb-0 md:shadow-xl md:rounded-2xl flex-col overflow-y-auto md:gap-2 h-fit max-h-[97vh]">
        {children}
      </div>
    </div>,
    container,
  );
}
