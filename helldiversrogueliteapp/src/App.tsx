import "./App.css";
import { weapons } from "./scripts/data/item_manifests";
import ItemIcon from "./components/ItemData/ItemIcon";
import type { weaponData } from "./scripts/defs/models/weaponData";
import { useState } from "react";

function App() {
  const manifestPrimaries: weaponData[] = weapons.filter(
    (x) => x.weaponSlot == "Primary"
  );

  const cssWeaponSize = { width: 200, height: 100 };

  const [primarySelection, setPrimarySelection] = useState<weaponData[]>([]);

  const generateUniqueIdx = (n: number, source: unknown[]): number[] => {
    const totalItems = source.length;
    let resultIdx: number[] = [];

    if (source.length < n) {
      resultIdx = Array.from({ length: n }, (_, k) =>
        Math.min(k, source.length - 1)
      );
      return resultIdx;
    }

    while (resultIdx.length < n) {
      let randomIdx: number = -1;
      while (randomIdx == -1 || resultIdx.some((x) => x == randomIdx)) {
        randomIdx = Math.floor(Math.random() * totalItems);
      }
      resultIdx.push(randomIdx);
      randomIdx = -1;
    }

    return resultIdx;
  };

  const rollPrimaries = () => {
    const newPrimaries: weaponData[] = [];
    generateUniqueIdx(3, manifestPrimaries).forEach(
      (v, i) => (newPrimaries[i] = manifestPrimaries[v])
    );

    setPrimarySelection(newPrimaries);
  };

  return (
    <>
      <button
        onClick={rollPrimaries}
        className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
      >
        Get random primaries
      </button>
      <div style={cssWeaponSize} className={`overflow-hidden`}>
        <ItemIcon data={primarySelection[0] ?? null}></ItemIcon>
      </div>
      <div style={cssWeaponSize} className={`overflow-hidden`}>
        <ItemIcon data={primarySelection[1] ?? null}></ItemIcon>
      </div>
      <div style={cssWeaponSize} className={`overflow-hidden`}>
        <ItemIcon data={primarySelection[2] ?? null}></ItemIcon>
      </div>
    </>
  );
}

export default App;
