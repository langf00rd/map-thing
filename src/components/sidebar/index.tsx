import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";

export default function SidebarPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(true);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  function toggleShow() {
    setShow((prev) => !prev);
  }

  useEffect(() => {
    const el = document.getElementById("overlay-root");
    if (el) setContainer(el);
  }, []);

  if (!container) return null;

  return createPortal(
    <div
      className={`p-3 fixed z-[9999] md:w-[400px] w-screen rounded-t-2xl md:rounded-t-none md:h-screen bottom-0 md:top-0 left-0 md:bg-transparent bg-white ${show ? "h-[70vh]" : "h-[15vh]"}`}
    >
      <div className="w-max mx-auto md:hidden mb-2">
        <Button size="sm" className="rounded-full" onClick={toggleShow}>
          {show ? "Hide menu" : "Show menu"}
        </Button>
      </div>
      <div className="flex flex-col overflow-y-auto gap-2 h-full">
        {children}
      </div>
    </div>,
    container,
  );
  // return createPortal(
  //   <div
  //     className={`fixed z-[9999] h-full bg-red-100 max-h-[98%] ml-2 mt-2 top-0 left-0 ${!show ? "w-0" : "w-[96%] md:w-[300px]"}`}
  //   >
  //     <div
  //       className={`h-full w-full flex flex-col gap-y-4 ${!show && "relative left-[-100vw]"}`}
  //     >
  //       {children}
  //     </div>
  // <Button
  //   onClick={toggleShow}
  //   className={`absolute top-0 ${show ? "-right-12" : "left-0"}`}
  // >
  //   {show ? <ChevronLeft /> : <ChevronRight />}
  // </Button>
  //   </div>,
  //   container,
  // );
}
