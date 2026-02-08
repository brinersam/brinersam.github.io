export const itemTagFlags = {
    None : 0,
    backpack_slot : 1 << 0,
    support_weapon : 1 << 1,
    SEAF : 1 << 2,
    orbital : 1 << 3,
    melee : 1 << 4
} as const;

export type itemTagFlags = typeof itemTagFlags[keyof typeof itemTagFlags];