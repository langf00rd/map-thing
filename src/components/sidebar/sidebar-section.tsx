import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";

export default function SidebarSection(props: {
  children: ReactNode;
  className?: ClassNameValue;
}) {
  return (
    <section
      className={cn(
        // "flex-1 p-2 border rounded-2xl bg-[#ffffff85] bg-red-200 backdrop-blur-xl overflow-y-scroll",
        "md:h-[50%] max:h-[80vh] md:min-h-[6%] min-h-[20%] md:border p-3 bg-[#ffffffb3] backdrop-blur-md rounded-3xl overflow-y-scroll",
        props.className,
      )}
    >
      {props.children}
    </section>
  );
}
