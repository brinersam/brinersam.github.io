import type { itemData } from "./itemData";

export interface armorData extends itemData {
    armorType : armorTypeEnum,
    armorFlags : armorTagsFlags,
}

export const armorTypeEnum = ['Medium','Light','Heavy'] as const;
export type armorTypeEnum = (typeof armorTypeEnum)[number];

export const armorTagsFlags = { // todo 
    None: 0,
    StrongArm: 1 << 0,
    Medic: 1 << 1,
} as const;
export type armorTagsFlags = typeof armorTagsFlags[keyof typeof armorTagsFlags];
