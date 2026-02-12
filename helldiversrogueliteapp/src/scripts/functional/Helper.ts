import type { UUID } from "../defs/helpers/appUUID";
import type { itemData } from "../defs/models/itemData";

export default class Helper{

    static generateListOfUniqueIdx = (
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

    static rollItems = <T extends itemData>(
        n: number,
        source: T[],
        excludeIds?: Set<UUID>
      ): T[] => {
        const chosenItems: T[] = [];
        Helper.generateListOfUniqueIdx(n, source, excludeIds).forEach(
          (v, i) => (chosenItems[i] = source[v])
        );
        return chosenItems;
      };
    
    static recordUniqueIdsDecorator = <T extends itemData>(
        source: T[],
        collisionIdSet: Set<UUID>,
        setter: React.Dispatch<React.SetStateAction<Set<string>>>
      ): T[] => {
        const updatedSet = new Set<UUID>(collisionIdSet);
        source.forEach((x) => updatedSet.add(x.id));
        setter(updatedSet);
        return source;
      };

}