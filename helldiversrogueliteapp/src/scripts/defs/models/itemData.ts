import type { UUID } from "../helpers/appUUID";
import type { itemQualityEnum } from "../enums/itemRarityEnum";
import type { itemTagFlags } from "../enums/itemTagFlags";

export interface itemData {
    id : UUID
    icon_url: string
    name : string
    tags : itemTagFlags
    quality : itemQualityEnum,
    inventoryOrder : number
  }
