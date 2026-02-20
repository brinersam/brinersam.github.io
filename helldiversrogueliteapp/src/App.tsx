import "./App.css";
import { manifest_stratagems } from "./scripts/data/item_manifests";
import type { weaponData } from "./scripts/defs/models/weaponData";
import {
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { stratagemData } from "./scripts/defs/models/stratagemData";
import type { UUID } from "./scripts/defs/helpers/appUUID";
import ItemsContainer from "./components/ItemContainer";
import GemButtonRow from "./components/GemButtonRow";
import type { armorData } from "./scripts/defs/models/armorData";
import ArmorFunctions from "./scripts/functional/ArmorFunctions";
import WeaponRepository from "./scripts/functional/Repositories/WeaponRepository";
import { AppContext } from "./react/context/AppContext";
import { stratagemTypeEnum } from "./scripts/defs/models/stratagemData";
import Helper from "./scripts/functional/Helper";

function App() {
  const contextValue = useContext(AppContext);

  console.log(contextValue);

  const manifestGemsRed = useMemo<stratagemData[]>(
    () => manifest_stratagems.filter((x) => x.stratagemType == "Red"),
    []
  );

  const manifestGemsBlue = useMemo<stratagemData[]>(
    () => manifest_stratagems.filter((x) => x.stratagemType == "Blue"),
    []
  );

  const manifestGemsGreen = useMemo<stratagemData[]>(
    () => manifest_stratagems.filter((x) => x.stratagemType == "Green"),
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

  const [items_armor_buffs, set_items_armor_buffs] = useState<armorData[]>([]);
  const [items_armor_buffs_names, set_items_armor_buffs_names] = useState<
    string[]
  >([]);
  const setArmors = (nBuffs: number, nArmors: number) => {
    const randomBuffsData = ArmorFunctions.getRandomBuffs(nBuffs);
    const randomArmors = ArmorFunctions.queryArmorsByBonuses(
      nArmors,
      randomBuffsData.map((x) => x.value)
    );

    set_items_armor_buffs_names(randomBuffsData.map((x) => x.name));
    set_items_armor_buffs(randomArmors);
  };

  const RollPrimaryWeapons = () => {
    set_items_Primary(WeaponRepository.rollPrimaryWeapons(2));
  };

  const RollSecondaryWeapons = () => {
    set_items_Secondary(WeaponRepository.rollSecondaryWeapons(2));
  };

  function RollStratagem(slot: number, type: stratagemTypeEnum) {
    let setter: Dispatch<SetStateAction<stratagemData[]>> | null = null;
    let source: stratagemData[] | null = null;

    switch (slot) {
      case 1:
        setter = set_items_gem_1;
        break;
      case 2:
        setter = set_items_gem_2;
        break;
      case 3:
        setter = set_items_gem_3;
        break;
      case 4:
        setter = set_items_gem_4;
        break;
      default:
        console.error(`incorrect (slot #${slot}) stratagem slot requested!`);
        return;
    }

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

    setter(
      Helper.rollItemsWSharedCollisions(
        3,
        source,
        gemCollisions,
        setGemCollisions
      )
    );
  }

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
