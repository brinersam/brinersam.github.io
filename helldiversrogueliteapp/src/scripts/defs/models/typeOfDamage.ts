export interface hasTypeOfDamage {
    dmgType : dmgTypeFlags
}

export const dmgTypeFlags = //todo
{
    None : 0,
    Boolet : 1 << 0,
    Energy : 1 << 1,
} as const;
export type dmgTypeFlags = typeof dmgTypeFlags[keyof typeof dmgTypeFlags];
