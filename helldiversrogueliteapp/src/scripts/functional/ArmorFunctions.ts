import { manifest_armors } from "../data/item_manifests";
import type { UUID } from "../defs/helpers/appUUID";
import { armorBonusFlagsKeys, armorBonusFlags } from "../defs/models/armorBonus";
import type { armorData } from "../defs/models/armorData";
import Helper from "./Helper";

export default class ArmorFunctions{
    static getRandomBuffs = (n: number) : {name : string, value: bigint}[] => {
        const randomBuffsIdx: number[] = Helper.generateListOfUniqueIdx(
          n,
          armorBonusFlagsKeys
        );

        const result : {name : string, value: bigint}[] = 
            randomBuffsIdx
                .map(idx => (
                    {
                        name: `${armorBonusFlagsKeys[idx]}`,
                        value:armorBonusFlags[armorBonusFlagsKeys[idx]]
                    }) );
    
        return result;
      };

    static queryArmorsByBonuses = (
        nPerBonus: number,
        bonuses: armorBonusFlags[],
      ): armorData[] => {
        let result: armorData[] = [];
    
        const collisionSet = new Set<UUID>(); 

        bonuses.forEach((xBonus) => {
          const filteredArmors = manifest_armors.filter(
            (xarmor) => (xarmor.armorBonus.armorBonusTags & xBonus) !== 0n //bothAndIndividually
          );
          const chosenArmors = Helper.rollItemsWSharedCollisions(
            nPerBonus,
            filteredArmors,
            collisionSet,
            (x) => (x.forEach(x => collisionSet.add(x)))
          );
          result = [...result, ...chosenArmors];
        });

        return result;
      };
}