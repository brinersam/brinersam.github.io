import "./App.css";
import {
  manifest_armors,
  manifest_stratagems,
  manifest_weapons,
} from "./scripts/data/item_manifests";
import {
  weaponSlotEnum,
  type weaponData,
} from "./scripts/defs/models/weaponData";
import { useMemo, useState, type ReactNode } from "react";
import type { stratagemData } from "./scripts/defs/models/stratagemData";
import type { UUID } from "./scripts/defs/helpers/appUUID";
import ItemsContainer from "./components/ItemContainer";
import GemButtonRow from "./components/GemButtonRow";
import type { armorData } from "./scripts/defs/models/armorData";
import ArmorFunctions from "./scripts/functional/ArmorFunctions";
import { stratagemTypeEnum } from "./scripts/defs/models/stratagemData";
import Helper from "./scripts/functional/Helper";
import { itemTagFlags } from "./scripts/defs/enums/itemTagFlags";
import DebugSettingsItems from "./components/DebugSettingsItems";
import {
  armorBonusFlags,
  armorBonusFlagsKeys,
} from "./scripts/defs/models/armorBonus";
import ItemIcon from "./components/ItemIcon";

function App() {
  //#region static data sources
  const [userPrefs, setUserPrefs] = useState<Set<UUID>>(new Set<UUID>());

  function AddRemoveItemPreference(id: UUID) {
    const newSet = new Set<UUID>(userPrefs);
    if (userPrefs.has(id)) {
      newSet.delete(id);
      console.log(`deleted ${id}`);
    } else {
      newSet.add(id);
      console.log(`added ${id}`);
    }
    setUserPrefs(newSet);
  }

  const user_manifest_armors = useMemo<armorData[]>(
    () => manifest_armors.filter((x) => userPrefs.has(x.id)),
    [userPrefs]
  );

  const armorRepository = useMemo<ArmorFunctions>(
    () => new ArmorFunctions(user_manifest_armors),
    [user_manifest_armors]
  );

  const user_manifest_weapons = useMemo<weaponData[]>(
    () => manifest_weapons.filter((x) => userPrefs.has(x.id)),
    [userPrefs]
  );

  const user_manifest_stratagems = useMemo<stratagemData[]>(
    () => manifest_stratagems.filter((_) => true), //userPrefs.has(x.id)),
    [] //[userPrefs]
  );

  const manifestGemsRed = useMemo<stratagemData[]>(
    () => user_manifest_stratagems.filter((x) => x.stratagemType == "Red"),
    [user_manifest_stratagems]
  );

  const manifestGemsBlue = useMemo<stratagemData[]>(
    () => user_manifest_stratagems.filter((x) => x.stratagemType == "Blue"),
    [user_manifest_stratagems]
  );

  const manifestGemsGreen = useMemo<stratagemData[]>(
    () => user_manifest_stratagems.filter((x) => x.stratagemType == "Green"),
    [user_manifest_stratagems]
  );
  //#endregion static data sources

  //#region css
  const cssWeaponSize = { width: 200, height: 110 };
  const cssGemSize = { width: 100, height: 100 };
  const cssArmorSize = { width: 200, height: 200 };
  //#endregion css

  //#region local display data
  const [forceFillSlots, setForceFillSlots] = useState<boolean>(true);

  const [items_Primary, set_items_Primary] = useState<weaponData[]>([]);
  const [items_Secondary, set_items_Secondary] = useState<weaponData[]>([]);
  const [items_gem_1, set_items_gem_1] = useState<stratagemData[]>([]);
  const [items_gem_2, set_items_gem_2] = useState<stratagemData[]>([]);
  const [items_gem_3, set_items_gem_3] = useState<stratagemData[]>([]);
  const [items_gem_4, set_items_gem_4] = useState<stratagemData[]>([]);

  const [gemCollisions, setGemCollisions] = useState<Set<UUID>>(
    new Set<UUID>()
  );
  //#endregion local display data

  const [items_armor_buffs, set_items_armor_buffs] = useState<armorData[][]>([
    [],
    [],
    [],
  ]);
  const [items_armor_buffs_names, set_items_armor_buffs_names] = useState<
    string[]
  >([]);
  const setArmors = (nBuffs: number, nArmors: number) => {
    const randomBuffs = armorRepository.getRandomBuffs(nBuffs);
    const randomArmors = armorRepository.queryArmorsByBonuses(
      nArmors,
      randomBuffs.map((x) => x.value)
    );

    set_items_armor_buffs_names(randomBuffs.map((x) => x.name));
    set_items_armor_buffs(randomArmors);
  };

  const RollPrimaryWeapons = () => {
    set_items_Primary(
      Helper.rollItems(
        2,
        user_manifest_weapons.filter((x) => x.weaponSlot == "Primary")
      )
    );
  };

  const RollSecondaryWeapons = () => {
    set_items_Secondary(
      Helper.rollItems(
        2,
        user_manifest_weapons.filter((x) => x.weaponSlot == "Secondary")
      )
    );
  };

  function RollStratagem(slot: number, type: stratagemTypeEnum) {
    let setState: ((data: stratagemData[]) => void) | undefined = undefined;
    switch (slot) {
      case 1:
        setState = set_items_gem_1;
        break;
      case 2:
        setState = set_items_gem_2;
        break;
      case 3:
        setState = set_items_gem_3;
        break;
      case 4:
        setState = set_items_gem_4;
        break;
      default:
        console.error(`incorrect (slot #${slot}) stratagem slot requested!`);
        return;
    }

    let source: stratagemData[] | undefined = undefined;
    switch (type) {
      case "Red":
        source = manifestGemsRed;
        break;
      case "Blue":
        source = manifestGemsBlue;
        break;
      case "Green":
        source = manifestGemsGreen;
        break;
      default:
        console.error(`incorrect gem type(${type}) stratagem slot requested!`);
        return;
    }

    let dataGenerator: (source: stratagemData[]) => stratagemData[] =
      generateGemsFromSource;

    if (forceFillSlots && type == "Blue") {
      dataGenerator = GenerateBlueGemsFillSlots;
    }

    setState(dataGenerator(source));
  }

  function generateGemsFromSource(
    source: stratagemData[],
    n?: number
  ): stratagemData[] {
    return Helper.rollItemsWSharedCollisions(
      n ?? 3,
      source,
      gemCollisions,
      setGemCollisions
    );
  }

  const isBackpack = (x: stratagemData) =>
    (x.tags & itemTagFlags.Backpack_slot) != 0;

  const isSupportSlot = (x: stratagemData) =>
    (x as never)[`weaponSlot`] == weaponSlotEnum[3];

  function GenerateBlueGemsFillSlots(source: stratagemData[]): stratagemData[] {
    const currentStratagems = [
      ...items_gem_1,
      ...items_gem_2,
      ...items_gem_3,
      ...items_gem_4,
    ];
    const currentBlueGems = currentStratagems.filter(
      (x) => x.stratagemType == "Blue"
    );
    if (currentBlueGems.length != 3) return generateGemsFromSource(source);

    const curOnlyBackpackSlots = currentBlueGems.filter(
      (x) => isBackpack(x) && !isSupportSlot(x)
    );

    const curOnlyWeaponSlots = currentBlueGems.filter(
      (x) => isSupportSlot(x) && !isBackpack(x)
    );

    let result: stratagemData[] = [];
    let remainingSlots = 3;

    const collisions = new Set<UUID>(gemCollisions);

    if (curOnlyBackpackSlots.length >= 1) {
      const weaponOnlyGem = Helper.rollItemsWSharedCollisions(
        1,
        source,
        collisions,
        (x) => x.forEach((x) => collisions.add(x)),
        (x: stratagemData) => isSupportSlot(x) && !isBackpack(x)
      )[0];
      result.push(weaponOnlyGem);
      console.log(
        `occpy support weapon slot (because of ${curOnlyBackpackSlots.flatMap(
          (x) => x.name
        )}})`
      );
      remainingSlots--;
    }

    if (curOnlyWeaponSlots.length >= 1) {
      const backpackOnlyGem = Helper.rollItemsWSharedCollisions(
        1,
        source,
        collisions,
        (x) => x.forEach((x) => collisions.add(x)),
        (x: stratagemData) => isBackpack(x) && !isSupportSlot(x)
      )[0];
      result.push(backpackOnlyGem);
      console.log(
        `occpy backpack only slot (because of ${curOnlyWeaponSlots.flatMap(
          (x) => x.name
        )}})`
      );
      remainingSlots--;
    }

    const remainingGems = Helper.rollItemsWSharedCollisions(
      remainingSlots,
      source,
      collisions,
      (x) => x.forEach((x) => collisions.add(x))
    );

    setGemCollisions(collisions);

    result = [...result, ...remainingGems];

    return result;
  }

  const resetAll = () => {
    set_items_Primary([]);
    set_items_Secondary([]);
    set_items_gem_1([]);
    set_items_gem_2([]);
    set_items_gem_3([]);
    set_items_gem_4([]);
    setGemCollisions(new Set<UUID>());
    set_items_armor_buffs([[], [], []]);
    set_items_armor_buffs_names([]);
  };

  function PrintEveryArmorByStatus() {
    const visualBlock: ReactNode[] = [];

    armorBonusFlagsKeys.forEach((xFlagKey) => {
      visualBlock.push(
        <>
          <h1 style={{ color: "white" }}>{xFlagKey}</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "50%",
              height: "50%",
            }}
          >
            {manifest_armors
              .filter(
                (xArmor) =>
                  (xArmor.armorBonus.armorBonusTags &
                    armorBonusFlags[xFlagKey]) !==
                  0n
              )
              .map((x) => (
                <div style={cssArmorSize}>
                  <ItemIcon data={x} />
                </div>
              ))}
          </div>
        </>
      );
    });

    return visualBlock;
  }

  return (
    <>
      <div>
        <button
          onClick={() => resetAll()}
          className="rounded-full bg-red-400 px-40 py-2 text-sm leading-5 font-semibold text-white hover:bg-red-700"
        >
          RESET
        </button>
        <input
          type="checkbox"
          checked={forceFillSlots}
          onChange={() => setForceFillSlots((prev) => !prev)}
        />
        <a style={{ color: "white" }}>
          ensure backpack and support weapon slots are filled with second blue
          gem generation
        </a>
      </div>
      {/* weapons bar*/}
      <div style={{ display: "flex" }}>
        <div>
          <button
            onClick={RollPrimaryWeapons}
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
            onClick={RollSecondaryWeapons}
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
          <GemButtonRow slot={1} gemMgr={RollStratagem} />
          <ItemsContainer data={items_gem_1} size={cssGemSize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow slot={2} gemMgr={RollStratagem} />
          <ItemsContainer data={items_gem_2} size={cssGemSize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow slot={3} gemMgr={RollStratagem} />
          <ItemsContainer data={items_gem_3} size={cssGemSize} itemCount={3} />
        </div>
        <div>
          <GemButtonRow slot={4} gemMgr={RollStratagem} />
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
            Get random armor [{items_armor_buffs_names.map((x) => `: ${x} :`)}]
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
          {items_armor_buffs.map((x, idx) => {
            return (
              <ItemsContainer
                key={`armorColumn#${idx}`}
                data={x}
                size={cssArmorSize}
                itemCount={2}
              />
            );
          })}
        </div>
      </div>
      <div>
        <h1 style={{ color: "white" }}>Options</h1>
        <button
          onClick={() => {
            const json = JSON.stringify(Array.from(userPrefs));
            localStorage.setItem("data", json);
          }}
          className="rounded-full bg-red-400 px-40 py-2 text-sm leading-5 font-semibold text-white hover:bg-red-700"
        >
          save settings
        </button>
        <button
          onClick={() => {
            const dataJson = localStorage.getItem("data");
            //
            const data = JSON.parse(dataJson!);
            if (data == null) return;

            setUserPrefs(new Set<UUID>(data));
          }}
          className="rounded-full bg-red-400 px-40 py-2 text-sm leading-5 font-semibold text-white hover:bg-red-700"
        >
          load settings
        </button>
        <h1 style={{ color: "white" }}>Primaries</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
        <DebugSettingsItems
          items={manifest_weapons.filter((x) => x.weaponSlot == "Primary")}
          size={cssWeaponSize}
          userPrefs={userPrefs}
          onClick={AddRemoveItemPreference}
        />
      </div>
      <div>
        <h1 style={{ color: "white" }}>Secondaries</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
        <DebugSettingsItems
          items={manifest_weapons.filter((x) => x.weaponSlot == "Secondary")}
          size={cssWeaponSize}
          userPrefs={userPrefs}
          onClick={AddRemoveItemPreference}
        />
      </div>
      <div>
        <h1 style={{ color: "white" }}>Armors</h1>
        <h1 style={{ color: "white" }}>Light</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
        <DebugSettingsItems
          items={manifest_armors.filter((x) => x.armorWeight == "Light")}
          size={cssArmorSize}
          userPrefs={userPrefs}
          onClick={AddRemoveItemPreference}
        />
      </div>
      <div>
        <h1 style={{ color: "white" }}>Medium</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
        <DebugSettingsItems
          items={manifest_armors.filter((x) => x.armorWeight == "Medium")}
          size={cssArmorSize}
          userPrefs={userPrefs}
          onClick={AddRemoveItemPreference}
        />
      </div>
      <div>
        <h1 style={{ color: "white" }}>Heavy</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "70%" }}>
        <DebugSettingsItems
          items={manifest_armors.filter((x) => x.armorWeight == "Heavy")}
          size={cssArmorSize}
          userPrefs={userPrefs}
          onClick={AddRemoveItemPreference}
        />
      </div>

      {PrintEveryArmorByStatus()}
    </>
  );
}

export default App;
