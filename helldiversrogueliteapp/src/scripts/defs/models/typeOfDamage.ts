export const dmgTypeFlags =
{
    None : 0,
    Boolet : 1 << 0,
    Energy : 1 << 1,
    SmallExplosive : 1 << 2,
    Explosive : 1 << 3,
    Electricity : 1 << 4,
    Incendiary : 1 << 5,
    Stun : 1 << 6,
    Gas : 1 << 7,
} as const;
export type dmgTypeFlags = typeof dmgTypeFlags[keyof typeof dmgTypeFlags];
