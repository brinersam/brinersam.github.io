import { itemTagFlags } from "../../../defs/enums/itemTagFlags";
import { dmgTypeFlags } from "../../../defs/models/typeOfDamage";
import type { weaponData } from "../../../defs/models/weaponData";

export const weapons_base: Array<weaponData> = [
  {
    id: "",
    name: "name",
    icon_url: "",
    tags: itemTagFlags.None,
    quality: "Medium",
    inventoryOrder: 0,

    dmgType: dmgTypeFlags.Boolet,
    weaponSlot: "Primary",
  },
];
