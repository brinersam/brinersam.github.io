import type { UUID } from "../defs/helpers/appUUID";
import { armorBonusFlagsKeys, armorBonusFlags } from "../defs/models/armorBonus";
import type { armorData } from "../defs/models/armorData";
import Helper from "./Helper";

export default class ArmorFunctions{
    private _armorSource! : armorData[];
    private _availableBuffs : armorBonusFlagsKeys[];

    constructor(armorSource : armorData[])
    {
      this._armorSource = armorSource;
      this._availableBuffs = this.calculatePossibleBuffs(armorSource);
    }

    private calculatePossibleBuffs(armors : armorData[]) : armorBonusFlagsKeys[]
    {
      const combinedBonuses = armors
        .map(x => x.armorBonus.armorBonusTags)
        .reduce((prev,cur) => {return (prev | cur)}, 0n)
      
      const bonusKeys = armorBonusFlagsKeys
        .filter(key => (combinedBonuses & armorBonusFlags[key]) === armorBonusFlags[key])
        .map(key => ((key as unknown) as armorBonusFlagsKeys));

      return bonusKeys;
    }

    getRandomBuffs (n: number) : {name : string, value: bigint}[]
    {
        const randomBuffsIdx: number[] = Helper.generateListOfUniqueIdx(
          n,
          this._availableBuffs
        );

        const result : {name : string, value: bigint}[] = 
            randomBuffsIdx
                .map(idx => 
                  {
                    const key = (this._availableBuffs[idx] as unknown) as keyof typeof armorBonusFlags; 
                    return {
                      name: key,
                      value: armorBonusFlags[key]
                    }
                  });
    
        return result;
    };

    queryArmorsByBonuses (nPerBonus: number, bonuses: armorBonusFlags[]) : armorData[][] 
    {
      const result: armorData[][] = [];
  
      const collisionSet = new Set<UUID>(); 

      bonuses.forEach((xBonus) => {
        const filteredArmors = this._armorSource
          .filter(xArmor => (xArmor?.armorBonus.armorBonusTags & xBonus) !== 0n);

        const chosenArmors = Helper.rollItemsWSharedCollisions(
          nPerBonus,
          filteredArmors,
          collisionSet,
          (x) => (x.forEach(x => collisionSet.add(x)))
        );
        result.push(chosenArmors);
      });

      return result;
    };
}