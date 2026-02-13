import type { UUID } from "../defs/helpers/appUUID";
import type { itemData } from "../defs/models/itemData";

export default class Helper{

    static generateListOfUniqueIdx = <T,>(
        n: number,
        dataSource: T[],
        excludeIds?: Set<UUID> | null,
        idGetter?: (value: T) => UUID
      ): number[] => {
        const resultsIdxSet = new Set<number>();
        const itemCount = dataSource.length;

        if (dataSource.length < n)
            return Array.from({ length: dataSource.length }, (v,i) => i+1);
    
        while (resultsIdxSet.size < n) {
          let randomIdx = Math.floor(Math.random() * itemCount); // 0 - itemcount-1
          let idxItemId: UUID | null = null;
          if (idGetter != null)
          {
            idxItemId = idGetter(dataSource[randomIdx]);
          }
    
          const stepDirection = Math.random() > 0.5 ? 1 : -1;
          const startingIdx = randomIdx;
    
          const idIsNotUnique = (id: UUID | null) =>
            excludeIds == null || idxItemId == null ? false : excludeIds.has(id as UUID);
    
          while (resultsIdxSet.has(randomIdx) || idIsNotUnique(idxItemId)) {
            randomIdx = randomIdx + stepDirection;
            randomIdx = randomIdx < 0 ? itemCount - 1 : randomIdx % itemCount;
    
            if (idGetter != null)
            {
              idxItemId = idGetter(dataSource[randomIdx]);
            }
    
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
        dataSource: T[],
        excludeIds?: Set<UUID>
      ): T[] => {
        const chosenItems: T[] = [];
        const idGetter = (x : itemData) => x.id;
        Helper.generateListOfUniqueIdx(n, dataSource, excludeIds, idGetter).forEach(
          (v, i) => (chosenItems[i] = dataSource[v])
        );
        return chosenItems;
      };
    
    static recordUniqueIdsDecorator = <T extends itemData>(
        dataSource: T[],
        collisionSource: Set<UUID>,
        collisionSourceSetter: React.Dispatch<React.SetStateAction<Set<string>>>
      ): T[] => {
        const updatedSet = new Set<UUID>(collisionSource);
        dataSource.forEach((x) => updatedSet.add(x.id));
        collisionSourceSetter(updatedSet);
        return dataSource;
      };

}