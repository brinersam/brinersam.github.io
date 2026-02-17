import type { itemData } from "./itemData"
import type { dmgTypeFlags } from "./typeOfDamage";

export interface weaponData extends itemData {
    weaponSlot : weaponSlotEnum,
    dmgType : dmgTypeFlags
}

export const weaponSlotEnum = ['Primary', 'Secondary', 'Grenade', 'Support', 'BackpackDog'] as const;
export type weaponSlotEnum = typeof weaponSlotEnum[number];
