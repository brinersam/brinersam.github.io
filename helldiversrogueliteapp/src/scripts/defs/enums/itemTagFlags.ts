export const itemTagFlags = {
    None : 0,
    Backpack_slot : 1 << 0,
    Eagle : 1 << 1,
    Orbital : 1 << 2,
    Melee : 1 << 3,
    OneHanded : 1 << 4,
    Stealth : 1 << 5,
    Mech : 1 << 6,
} as const;

export type itemTagFlags = typeof itemTagFlags[keyof typeof itemTagFlags];