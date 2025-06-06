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
        "h-[50%] border p-3 bg-[#ffffff85] backdrop-blur-xl rounded-3xl overflow-y-scroll",
        props.className,
      )}
    >
      {props.children}
    </section>
  );
}
