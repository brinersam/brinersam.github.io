import { stratagemTypeEnum } from "../scripts/defs/models/stratagemData";

export default function GemButtonRow({
  slot,
  gemMgr,
}: {
  slot: number;
  gemMgr: (slot: number, type: stratagemTypeEnum) => void;
}) {
  const typeToCssMap: Record<stratagemTypeEnum, string> = {
    Red: "rounded-full bg-red-400 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-red-700",
    Blue: "rounded-full bg-sky-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-sky-700",
    Green:
      "rounded-full bg-green-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-green-700",
  } as const;

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {Object.entries(typeToCssMap).map(([key, value]) => {
        return (
          <button
            key={`slot${slot}type${key}`}
            onClick={() => gemMgr(slot, key as stratagemTypeEnum)}
            className={value}
          />
        );
      })}
    </div>
  );
}
