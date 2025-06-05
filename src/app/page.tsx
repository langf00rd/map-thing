"use client";

import dynamic from "next/dynamic";

// dynamically import map component without ssr
const DynamicMap = dynamic(() => import("@/components/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <DynamicMap />
    </>
  );
}
