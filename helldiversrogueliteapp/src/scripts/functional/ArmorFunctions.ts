import { armors } from "../data/item_manifests";
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
        armorCollisions: Set<UUID>,
        armorCollisionsSetter: React.Dispatch<React.SetStateAction<Set<string>>>
      ): armorData[] => {
        let result: armorData[] = [];
    
        bonuses.forEach((xBonus) => {
          const filteredArmors = armors.filter(
            (xarmor) => (xarmor.armorBonus.armorBonusTags & xBonus) !== 0n //bothAndIndividually
          );
          const chosenArmors = Helper.rollItemsWSharedCollisions(
            nPerBonus,
            filteredArmors,
            armorCollisions,
            armorCollisionsSetter
          );
          result = [...result, ...chosenArmors];
        });

        return result;
      };
}