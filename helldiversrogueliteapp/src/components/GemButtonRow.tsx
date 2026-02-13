import type { stratagemData } from "../scripts/defs/models/stratagemData";
import Helper from "../scripts/functional/Helper";

export default function GemButtonRow({
  gemSetter,
  itemAmount,
  dataSources,
  collisionSource,
  collisionSetter,
}: {
  gemSetter: (value: React.SetStateAction<stratagemData[]>) => void;
  itemAmount: number;
  dataSources: stratagemData[][];
  collisionSource: Set<string>;
  collisionSetter: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
  const buttonCssMap: string[] = [
    "rounded-full bg-red-400 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-red-700",
    "rounded-full bg-sky-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-sky-700",
    "rounded-full bg-green-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-green-700",
  ] as const;

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {dataSources.map((value, idx) => {
        return (
          <button
            key={idx}
            onClick={() =>
              gemSetter(
                Helper.rollItemsWSharedCollisions(
                  itemAmount,
                  value,
                  collisionSource,
                  collisionSetter
                )
              )
            }
            className={buttonCssMap[idx]}
          />
        );
      })}
    </div>
  );
}
