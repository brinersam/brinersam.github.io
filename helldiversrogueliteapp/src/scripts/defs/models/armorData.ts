import type { armorBonusesEnum } from "./armorBonus";
import type { itemData } from "./itemData";

export interface armorData extends itemData {
    armorWeight : armorWeightEnum,
    armorBonus : armorBonusesEnum,
}

// \==============================================
export const armorWeightEnum = ['Medium','Light','Heavy'] as const;
export type armorWeightEnum = (typeof armorWeightEnum)[number];