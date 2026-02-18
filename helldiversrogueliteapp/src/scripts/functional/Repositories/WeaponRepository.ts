import { manifest_weapons } from "../../data/item_manifests";
import Helper from "../Helper";

export default class WeaponRepository
{
    static manifestPrimaries =  manifest_weapons.filter((x) => x.weaponSlot == "Primary");
    static manifestSecondaries = manifest_weapons.filter((x) => x.weaponSlot == "Secondary");

    static rollPrimaryWeapons(n:number)
    {
        return Helper.rollItems(n, WeaponRepository.manifestPrimaries);
    }

    static rollSecondaryWeapons(n:number)
    {
        return Helper.rollItems(n, WeaponRepository.manifestSecondaries);
    }

}