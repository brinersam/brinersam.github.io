import "./App.css";
import { stratagems, weapons } from "./scripts/data/item_manifests";
import type { weaponData } from "./scripts/defs/models/weaponData";
import { useMemo, useState } from "react";
import type { stratagemData } from "./scripts/defs/models/stratagemData";
import type { UUID } from "./scripts/defs/helpers/appUUID";
import ItemsContainer from "./components/ItemContainer";
import Helper from "./scripts/functional/Helper";
import GemButtonRow from "./components/GemButtonRow";
import type { armorData } from "./scripts/defs/models/armorData";
import ArmorFunctions from "./scripts/functional/ArmorFunctions";

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

  const cssWeaponSize = { width: 200, height: 110 };
  const cssGemSize = { width: 100, height: 100 };
  const cssArmorSize = { width: 200, height: 200 };

  const [items_Primary, set_items_Primary] = useState<weaponData[]>([]);
  const [items_Secondary, set_items_Secondary] = useState<weaponData[]>([]);
  const [items_gem_1, set_items_gem_1] = useState<stratagemData[]>([]);
  const [items_gem_2, set_items_gem_2] = useState<stratagemData[]>([]);
  const [items_gem_3, set_items_gem_3] = useState<stratagemData[]>([]);
  const [items_gem_4, set_items_gem_4] = useState<stratagemData[]>([]);

  const [gemCollisions, setGemCollisions] = useState<Set<UUID>>(
    new Set<UUID>()
  );

  const [armorCollisions, setArmorCollisions] = useState<Set<UUID>>(
    new Set<UUID>()
  );
  const [items_armor_buffs, set_items_armor_buffs] = useState<armorData[]>([]);
  const [items_armor_buffs_names, set_items_armor_buffs_names] = useState<
    string[]
  >([]);
  const setArmors = (nBuffs: number, nArmors: number) => {
    const randomBuffsData = ArmorFunctions.getRandomBuffs(nBuffs);
    const randomArmors = ArmorFunctions.queryArmorsByBonuses(
      nArmors,
      randomBuffsData.map((x) => x.value),
      armorCollisions,
      setArmorCollisions
    );

    set_items_armor_buffs_names(randomBuffsData.map((x) => x.name));
    set_items_armor_buffs(randomArmors);
  };

  const resetAll = () => {
    set_items_Primary([]);
    set_items_Secondary([]);
    set_items_gem_1([]);
    set_items_gem_2([]);
    set_items_gem_3([]);
    set_items_gem_4([]);
    setGemCollisions(new Set<UUID>());
    set_items_armor_buffs([]);
    set_items_armor_buffs_names([]);
    setArmorCollisions(new Set<UUID>());
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
              set_items_Primary(Helper.rollItems(2, manifestPrimaries))
            }
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random primaries
          </button>
          <ItemsContainer
            data={items_Primary}
            size={cssWeaponSize}
            itemCount={2}
          />
        </div>
        <div>
          <button
            onClick={() =>
              set_items_Secondary(Helper.rollItems(2, manifestSecondaries))
            }
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random secondaries
          </button>
          <ItemsContainer
            data={items_Secondary}
            size={cssWeaponSize}
            itemCount={2}
          />
        </div>
      </div>
      {/* gem bar*/}
      <div style={{ display: "flex" }}>
        <div>
          <GemButtonRow
            gemSetter={set_items_gem_1}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={items_gem_1} size={cssGemSize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow
            gemSetter={set_items_gem_2}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={items_gem_2} size={cssGemSize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow
            gemSetter={set_items_gem_3}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={items_gem_3} size={cssGemSize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow
            gemSetter={set_items_gem_4}
            collisionSource={gemCollisions}
            collisionSetter={setGemCollisions}
            itemAmount={3}
            dataSources={[manifestGemsRed, manifestGemsBlue, manifestGemsGreen]}
          />
          <ItemsContainer data={items_gem_4} size={cssGemSize} itemCount={3} />
        </div>
      </div>
      {/* armors */}
      <div style={{ display: "flex" }}>
        <div>
          <button
            onClick={() => setArmors(3, 2)}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random buff [{items_armor_buffs_names.map((x) => `: ${x} :`)}]
          </button>
        </div>
      </div>
      <div>
        <div
          style={{
            height: `${cssArmorSize.height * 2}px`,
            width: `${cssArmorSize.width * 3}px`,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <ItemsContainer
            data={items_armor_buffs}
            size={cssArmorSize}
            itemCount={6}
          />
        </div>
      </div>
    </>
  );
}

export default App;
