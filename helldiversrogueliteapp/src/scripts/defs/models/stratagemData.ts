import type { itemData } from "./itemData";
import type { hasTypeOfDamage } from "./typeOfDamage";

export interface stratagemData extends itemData {
    stratagemType : stratagemTypeEnum
}

export interface stratagemWeaponData extends stratagemData, hasTypeOfDamage {}

export const stratagemTypeEnum = ['Red','Blue','Green'] as const;
export type stratagemTypeEnum = (typeof stratagemTypeEnum)[number];