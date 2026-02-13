import type { UUID } from "../defs/helpers/appUUID";
import type { itemData } from "../defs/models/itemData";

export default class Helper{

    static generateListOfUniqueIdx = <T,>(
        n: number,
        dataSource: T[],
        predicate?: (value:T) => boolean
      ): number[] => {
        const resultsIdxSet = new Set<number>();
        const itemCount = dataSource.length;

        if (dataSource.length < n)
            return Array.from({ length: dataSource.length }, (_,i) => i+1);
    
        while (resultsIdxSet.size < n) {
          let randomIdx = Math.floor(Math.random() * itemCount); // 0 - itemcount-1
    
          const stepDirection = Math.random() > 0.5 ? 1 : -1;
          const startingIdx = randomIdx;

          while (true) {
            randomIdx = randomIdx + stepDirection;
            randomIdx = randomIdx < 0 ? itemCount - 1 : randomIdx % itemCount; // wrap around
            const item = dataSource[randomIdx];

            if (randomIdx == startingIdx) // infinite loop
              break;

            if (resultsIdxSet.has(randomIdx)) // duplicate idx
              continue;

            if (predicate != null) // predicate last
              if (predicate!(item) == false)
                continue;

            break; // found value
          }

          resultsIdxSet.add(randomIdx);
        }
    
        return [...resultsIdxSet];
      };

    static rollItems = <T extends itemData>(
        n: number,
        dataSource: T[],
        predicate?: (value:T) => boolean
      ): T[] => {
        const chosenItems: T[] = [];
        Helper.generateListOfUniqueIdx(n, dataSource, predicate).forEach(
          (v, i) => (chosenItems[i] = dataSource[v])
        );
        return chosenItems;
      };
    
    static rollItemsWSharedCollisions = <T extends itemData>(
        n: number,
        dataSource: T[],
        collisionSource: Set<UUID>,
        collisionSourceSetter: React.Dispatch<React.SetStateAction<Set<string>>>
      ): T[] => {

        const newCollisionSet = new Set<UUID>(collisionSource);
        const collisionPredicate = (x : T) =>{
          if (newCollisionSet.has(x.id))
            return false;
          newCollisionSet.add(x.id);
          return true;
        }
        const rolledItems = this.rollItems(n, dataSource, collisionPredicate)
        collisionSourceSetter(newCollisionSet);
        return rolledItems;
      };

}