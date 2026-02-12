import "./App.css";
import { armors, stratagems, weapons } from "./scripts/data/item_manifests";
import ItemIcon from "./components/ItemData/ItemIcon";
import type { weaponData } from "./scripts/defs/models/weaponData";
import { useMemo, useState } from "react";
import type { stratagemData } from "./scripts/defs/models/stratagemData";
import type { itemData } from "./scripts/defs/models/itemData";
import type { UUID } from "./scripts/defs/helpers/appUUID";
import { armorBonusFlags } from "./scripts/defs/models/armorBonus";

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
  const cssGenSize = { width: 100, height: 100 };

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

  const generateListOfUniqueIdx = (
    n: number,
    source: itemData[],
    excludeIds?: Set<UUID> | null
  ): number[] => {
    const resultsIdxSet = new Set<number>();
    const itemCount = source.length;

    while (resultsIdxSet.size < n) {
      let randomIdx = Math.floor(Math.random() * itemCount); // 0 - itemcount-1
      let idxItemId: UUID = source[randomIdx].id;

      const stepDirection = Math.random() > 0.5 ? 1 : -1;
      const startingIdx = randomIdx;

      const idIsNotUnique = (id: UUID) =>
        excludeIds == null ? false : excludeIds.has(id);

      while (resultsIdxSet.has(randomIdx) || idIsNotUnique(idxItemId)) {
        randomIdx = randomIdx + stepDirection;
        randomIdx = randomIdx < 0 ? itemCount - 1 : randomIdx % itemCount;

        idxItemId = source[randomIdx].id;

        if (randomIdx == startingIdx) {
          console.log("DEBUG: infinite loop prevented");
          break;
        }
      }
      resultsIdxSet.add(randomIdx);
    }

    return [...resultsIdxSet];
  };

  const rollItems = <T extends itemData>(
    n: number,
    source: T[],
    excludeIds?: Set<UUID>
  ): T[] => {
    const chosenItems: T[] = [];
    generateListOfUniqueIdx(n, source, excludeIds).forEach(
      (v, i) => (chosenItems[i] = source[v])
    );
    return chosenItems;
  };

  const recordUniqueIdsDecorator = <T extends itemData>(
    source: T[],
    collisionIdSet: Set<UUID>
  ): T[] => {
    const updatedSet = new Set<UUID>(collisionIdSet);
    source.forEach((x) => updatedSet.add(x.id));
    setGemCollisions(updatedSet);
    return source;
  };

  return (
    <>
      <div>
        <button
          onClick={() => resetAll()}
          className="rounded-full bg-red-400 px-40 py-2 text-sm leading-5 font-semibold text-white hover:bg-red-700"
        >
          {" "}
          RESET{" "}
        </button>
      </div>
      {/* weapons bar*/}
      <div style={{ display: "flex" }}>
        <div>
          <button
            onClick={() => setPrimarySelection(rollItems(2, manifestPrimaries))}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random primaries
          </button>
          <div style={cssWeaponSize} className={`overflow-hidden`}>
            <ItemIcon data={primarySelection[0]}></ItemIcon>
          </div>
          <div style={cssWeaponSize} className={`overflow-hidden`}>
            <ItemIcon data={primarySelection[1]}></ItemIcon>
          </div>
        </div>
        <div>
          <button
            onClick={() =>
              setSecondarySelection(rollItems(2, manifestSecondaries))
            }
            className="rounded-full bg-sky-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
          >
            Get random secondaries
          </button>
          <div style={cssWeaponSize} className={`overflow-hidden`}>
            <ItemIcon data={secondarySelection[0]}></ItemIcon>
          </div>
          <div style={cssWeaponSize} className={`overflow-hidden`}>
            <ItemIcon data={secondarySelection[1]}></ItemIcon>
          </div>
        </div>
      </div>
      {/* gems bar*/}
      <div style={{ display: "flex" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              onClick={() =>
                setGem1(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsRed, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-red-400 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-red-700"
            />
            <button
              onClick={() =>
                setGem1(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsBlue, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-sky-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
            />
            <button
              onClick={() =>
                setGem1(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsGreen, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-green-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-green-700"
            />
          </div>

          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem1[0]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem1[1]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem1[2]}></ItemIcon>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              onClick={() =>
                setGem2(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsRed, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-red-400 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-red-700"
            />
            <button
              onClick={() =>
                setGem2(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsBlue, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-sky-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
            />
            <button
              onClick={() =>
                setGem2(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsGreen, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-green-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-green-700"
            />
          </div>

          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem2[0]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem2[1]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem2[2]}></ItemIcon>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              onClick={() =>
                setGem3(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsRed, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-red-400 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-red-700"
            />
            <button
              onClick={() =>
                setGem3(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsBlue, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-sky-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
            />
            <button
              onClick={() =>
                setGem3(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsGreen, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-green-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-green-700"
            />
          </div>

          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem3[0]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem3[1]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem3[2]}></ItemIcon>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              onClick={() =>
                setGem4(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsRed, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-red-400 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-red-700"
            />
            <button
              onClick={() =>
                setGem4(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsBlue, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-sky-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-sky-700"
            />
            <button
              onClick={() =>
                setGem4(
                  recordUniqueIdsDecorator(
                    rollItems(3, manifestGemsGreen, gemCollisions),
                    gemCollisions
                  )
                )
              }
              className="rounded-full bg-green-500 px-3 py-5 text-sm leading-5 font-semibold text-white hover:bg-green-700"
            />
          </div>

          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem4[0]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem4[1]}></ItemIcon>
          </div>
          <div style={cssGenSize} className={`overflow-hidden`}>
            <ItemIcon data={gem4[2]}></ItemIcon>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
