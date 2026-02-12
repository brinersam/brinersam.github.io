import "./App.css";
import { armors, stratagems, weapons } from "./scripts/data/item_manifests";
import type { weaponData } from "./scripts/defs/models/weaponData";
import { useMemo, useState } from "react";
import type { stratagemData } from "./scripts/defs/models/stratagemData";
import type { UUID } from "./scripts/defs/helpers/appUUID";
import { armorBonusFlags } from "./scripts/defs/models/armorBonus";
import ItemsContainer from "./components/ItemContainer";
import Helper from "./scripts/functional/Helper";
import GemButtonRow from "./components/GemButtonRow";

function App() {
  const manifestPrimaries = useMemo<weaponData[]>(
    () => weapons.filter((x) => x.weaponSlot == "Primary"),
    []
  );

  const manifestSecondaries = useMemo<weaponData[]>(
    () => weapons.filter((x) => x.weaponSlot == "Secondary"),
    []
  );

  const manifestGemsRed = useMemo<stratagemData[]>(
    () => stratagems.filter((x) => x.stratagemType == "Red"),
    []
  );

  const manifestGemsBlue = useMemo<stratagemData[]>(
    () => stratagems.filter((x) => x.stratagemType == "Blue"),
    []
  );

  const manifestGemsGreen = useMemo<stratagemData[]>(
    () => stratagems.filter((x) => x.stratagemType == "Green"),
    []
  );

  console.log(
    armors
      .filter((x) => {
        const target =
          armorBonusFlags.Grenades_More | armorBonusFlags.ResistanceChest;

        const bothOnly = (x.armorBonus.armorBonusTags & target) === target; // if empty result or less than needed, then do other one
        const bothAndIndividually =
          (x.armorBonus.armorBonusTags & target) !== 0n;

        return bothAndIndividually;
      })
      // .filter((x) => x.armorWeight == "Heavy")
      .map((x) => `${x.name} : ${x.armorBonus.description} ::: \n`)
      .toString()
  );

  const cssWeaponSize = { width: 200, height: 110 };
  const cssGemize = { width: 100, height: 100 };

  const [primarySelection, setPrimarySelection] = useState<weaponData[]>([]);
  const [secondarySelection, setSecondarySelection] = useState<weaponData[]>(
    []
  );
  const [gem1, setGem1] = useState<stratagemData[]>([]);
  const [gem2, setGem2] = useState<stratagemData[]>([]);
  const [gem3, setGem3] = useState<stratagemData[]>([]);
  const [gem4, setGem4] = useState<stratagemData[]>([]);

  const [gemCollisions, setGemCollisions] = useState<Set<UUID>>(
    new Set<UUID>()
  );

  const resetAll = () => {
    setPrimarySelection([]);
    setSecondarySelection([]);
    setGem1([]);
    setGem2([]);
    setGem3([]);
    setGem4([]);
    setGemCollisions(new Set<UUID>());
  };

  return (
    <>
      <div>
        <button
          onClick={() => resetAll()}
          className="rounded-full bg-red-400 px-40 py-2 text-sm leading-5 font-semibold text-white hover:bg-red-700"
        >
          RESET
        </button>
      </div>
      {/* weapons bar*/}
      <div style={{ display: "flex" }}>
        <div>
          <button
            onClick={() =>
              setPrimarySelection(Helper.rollItems(2, manifestPrimaries))
            }
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random primaries
          </button>
          <ItemsContainer
            data={primarySelection}
            size={cssWeaponSize}
            itemCount={2}
          />
        </div>
        <div>
          <button
            onClick={() =>
              setSecondarySelection(Helper.rollItems(2, manifestSecondaries))
            }
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random secondaries
          </button>
          <ItemsContainer
            data={secondarySelection}
            size={cssWeaponSize}
            itemCount={2}
          />
        </div>
      </div>
      {/* gems bar*/}
      <div style={{ display: "flex" }}>
        <div>
          <GemButtonRow
            gemSetter={setGem1}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={gem1} size={cssGemize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow
            gemSetter={setGem2}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={gem2} size={cssGemize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow
            gemSetter={setGem3}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={gem3} size={cssGemize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow
            gemSetter={setGem4}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={gem4} size={cssGemize} itemCount={3} />
        </div>
      </div>
    </>
  );
}

export default App;
