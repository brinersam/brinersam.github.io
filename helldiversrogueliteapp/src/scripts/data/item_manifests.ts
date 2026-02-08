import type { armorData } from "../defs/models/armorData";
import type { itemData } from "../defs/models/itemData";
import type { stratagemData } from "../defs/models/stratagemData";
import type { weaponData } from "../defs/models/weaponData";
import { armors_base } from "./dlc_manifests/base/armors_base";
import { stratagems_base } from "./dlc_manifests/base/stratagems_base";
import { weapons_base } from "./dlc_manifests/base/weapons_base";

export const weapons : weaponData[] = 
[
    ...weapons_base,
];

export const armors : armorData[] = 
[
    ...armors_base,
];

export const stratagems : stratagemData[] = 
[
    ...stratagems_base,
];

export const manifest : itemData[] = 
[
    ...weapons,
    ...armors,
    ...stratagems
];
