import type { itemQualityEnum } from "../enums/itemRarityEnum";
import type { itemTagFlags } from "../enums/itemTagFlags";
import type { entityBase } from "../helpers/entity";

export interface itemData extends entityBase {
    icon_url: string
    tags : itemTagFlags,
    quality : itemQualityEnum,
    inventoryOrder : number
  }
