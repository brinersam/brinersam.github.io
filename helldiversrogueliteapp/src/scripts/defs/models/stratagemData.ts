import type { itemData } from "./itemData";
import type { weaponData } from "./weaponData";

export interface stratagemData extends itemData {
    stratagemType : stratagemTypeEnum
}

export interface stratagemWeaponData extends stratagemData, weaponData {}

export const stratagemTypeEnum = ['Red','Blue','Green'] as const;
export type stratagemTypeEnum = (typeof stratagemTypeEnum)[number];