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
import type { armorData } from "./scripts/defs/models/armorData";

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

  // console.log(
  //   armors
  //     .filter((x) => {
  //       const target =
  //         armorBonusFlags.Grenades_More | armorBonusFlags.ResistanceChest;

  //       const bothOnly = (x.armorBonus.armorBonusTags & target) === target; // if empty result or less than needed, then do other one
  //       const bothAndIndividually =
  //         (x.armorBonus.armorBonusTags & target) !== 0n;

  //       return bothAndIndividually;
  //     })
  //     // .filter((x) => x.armorWeight == "Heavy")
  //     .map((x) => `${x.name} : ${x.armorBonus.description} ::: \n`)
  //     .toString()
  // );

  const armorBonusFlagsKeys = Object.keys(armorBonusFlags).slice(
    1
  ) as (keyof typeof armorBonusFlags)[];
  const getRandomBuffs = (n: number) => {
    const randomBuffsIdx: number[] = Helper.generateListOfUniqueIdx(
      n,
      armorBonusFlagsKeys
    );

    set_items_armor_buffs_names(
      randomBuffsIdx.map((x) => `${armorBonusFlagsKeys[x]} : `)
    );

    const randomBuffs = randomBuffsIdx.map(
      (idx) => armorBonusFlags[armorBonusFlagsKeys[idx]]
    );
    return randomBuffs.reduce(
      (running: armorBonusFlags, cur: armorBonusFlags) => running | cur,
      0n
    );
  };

  const queryArmors = (target: armorBonusFlags) => {
    const result: armorData[] = armors.filter((x) => {
      const bothAndIndividually = (x.armorBonus.armorBonusTags & target) !== 0n;
      return bothAndIndividually;
    });

    return result;
  };

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

  const [items_armor_buffs, set_items_armor_buffs] = useState<armorData[]>([]);
  const [items_armor_buffs_names, set_items_armor_buffs_names] = useState<
    string[]
  >([]);

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
            onClick={() =>
              set_items_armor_buffs(
                Helper.rollItems(6, queryArmors(getRandomBuffs(2)))
              )
            }
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random buff (current : {items_armor_buffs_names})
          </button>
        </div>
      </div>
      <div>
        <div
          style={{
            width: `${cssArmorSize.width * 3}px`,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <ItemsContainer
            data={items_armor_buffs}
            size={cssArmorSize}
            itemCount={6}
          />
        </div>
        {/* <div style={{ color: "white" }}>
          {items_armor_buffs.map((x) => (
            <p>
              {x.name}:{x.armorBonus.description}
            </p>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default App;
