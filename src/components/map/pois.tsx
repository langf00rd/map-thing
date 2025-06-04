import { POI } from "@/lib/types";
import { Input } from "../ui/input";

export default function PlacesOfInterest(props: { data: POI[] }) {
  if (props.data.length < 1) return null;
  return (
    <div className="w-[500px] space-y-3 rounded-sm p-4 h-[40vh] fixed bottom-20 overflow-y-scroll right-3 bg-white border shadow-sm z-[1000]">
      <Input placeholder="Search..." />
      <ul className="space-y-5">
        {props.data.map((poi) => (
          <li key={poi.id} className="">
            <p className="font-semibold">{poi.name}</p>
            <p className="text-neutral-500">{poi.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
