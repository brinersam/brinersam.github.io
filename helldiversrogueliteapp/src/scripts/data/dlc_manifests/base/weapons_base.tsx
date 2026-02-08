import { itemTagFlags } from "../../../defs/enums/itemTagFlags";
import { dmgTypeFlags } from "../../../defs/models/typeOfDamage";
import type { weaponData } from "../../../defs/models/weaponData";

export const weapons_base: Array<weaponData> = [
  {
    id: "5c8aa85a-7702-4d57-b7bd-08581467beb2",
    name: "Liberator",
    icon_url: "./1920px-AR-23A_Liberator_Carbine_Primary_Render.webp",
    tags: itemTagFlags.None,
    quality: "Medium",
    inventoryOrder: 0,

    dmgType: dmgTypeFlags.Boolet,
    weaponSlot: "Primary",
  },
  {
    id: "cb1325b6-de3a-4e1d-b74b-d7afe433cbf0",
    name: "Liberator Concussive",
    icon_url: "./1920px-AR-23C_Liberator_Concussive_Primary_Render.webp",
    tags: itemTagFlags.None,
    quality: "Low",
    inventoryOrder: 0,

    dmgType: dmgTypeFlags.Boolet | dmgTypeFlags.SmallExplosive,
    weaponSlot: "Primary",
  },
  {
    id: "84496870-511b-4d6c-a8ed-d9bfec933042",
    name: "Liberator Penetrator",
    icon_url: "./1920px-AR-23P_Liberator_Penetrator_Primary_Render.webp",
    tags: itemTagFlags.None,
    quality: "Low",
    inventoryOrder: 0,

    dmgType: dmgTypeFlags.Boolet,
    weaponSlot: "Primary",
  },
];
