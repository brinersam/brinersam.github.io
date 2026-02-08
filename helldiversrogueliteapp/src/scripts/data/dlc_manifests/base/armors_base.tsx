import { itemTagFlags } from "../../../defs/enums/itemTagFlags";
import { armorTagsFlags, type armorData } from "../../../defs/models/armorData";

export const armors_base: Array<armorData> = [
  {
    id: "",
    name: "name",
    icon_url: "",
    tags: itemTagFlags.None,
    quality: "Medium",
    inventoryOrder: 0,

    armorFlags: armorTagsFlags.None,
    armorType: "Medium",
  },
];
