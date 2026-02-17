export const itemTagFlags = {
    None : 0,
    Backpack_slot : 1 << 0,
    Support_weapon : 1 << 1,
    SEAF : 1 << 2,
    Orbital : 1 << 3,
    Melee : 1 << 4,
    OneHanded : 1 << 5
} as const;

export type itemTagFlags = typeof itemTagFlags[keyof typeof itemTagFlags];