import type { itemData } from "./itemData"
import type { hasTypeOfDamage } from "./typeOfDamage";

export interface weaponData extends itemData, hasTypeOfDamage {
    weaponSlot : weaponSlotEnum,
}

export const weaponSlotEnum = ['Primary', 'Secondary', 'Grenade', 'Support'] as const;
export type weaponSlotEnum = typeof weaponSlotEnum[number];

