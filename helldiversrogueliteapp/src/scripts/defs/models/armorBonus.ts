// interface armorBonus
// {
//     description : string,
//     icon_url : string,
//     armorBonusTags : armorBonusFlags
// }

export const armorBonusFlags = {
    None : 0n,
    // DmgToStam : 1n << 0n,
    HighArmor : 1n << 1n,
    ScoutPing : 1n << 2n,
    Democracy : 1n << 3n,

    ReducedNoise : 1n << 4n,
    ReducedDetection : 1n << 5n,

    // NoRagdolling : 1n << 6n,
    NoBleeding : 1n << 7n,
    // NoBrokenLegs : 1n << 8n, 
    // NoFlinch : 1n << 9n,

    ResistanceAcid : 1n << 11n,
    ResistanceExplosive : 1n << 12n,
    ResistanceElectric : 1n << 13n,
    ResistanceFire : 1n << 14n,
    ResistanceGas : 1n << 15n,

    // ResistanceChest : 1n << 16n,
    ResistanceLimbs : 1n << 17n,

    StrongerThrow: 1n << 18n,
    StrongerMelee : 1n << 19n,
    // StrongerPOIRange : 1n << 20n,

    // Secondary_FasterReload : 1n << 21n,
    // Secondary_ReducedRecoil : 1n << 22n,
    // Secondary_FasterHolster : 1n << 23n,

    Weapons_FasterReload  : 1n << 24n, // Primary_FasterReload, include secondaries in this so they are not as pigeonholed into their own thing

    // Weapons_MoreAmmo  : 1n << 25n,
    // Weapons_StrongerHandling : 1n << 26n,
    Weapons_ReducedRecoil_CrouchProne : 1n << 27n,

    // Death_Ressurection : 1n << 28n,
    // Death_Explode : 1n << 29n,

    Grenades_More : 1n << 30n,

    Stim_Longer : 1n << 31n,
    // Stim_More : 1n << 32n,
} as const;
export type armorBonusFlags = typeof armorBonusFlags[keyof typeof armorBonusFlags];

export const armorBonusFlagsKeys = Object.keys(armorBonusFlags).slice(
    1
  ) as (keyof typeof armorBonusFlags)[];
export type armorBonusFlagsKeys = typeof armorBonusFlagsKeys;



export const armorBonusesEnum = { 
    SupplementaryAdrenaline : {
        description : "When the wearer takes damage, they regain some stamina.Provides a higher armor rating.",
        icon_url : "./Supplementary_Adrenaline_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.HighArmor // | armorBonusFlags.DmgToStam
    },
    ReducedSignature : {
        description : "Wearer makes 50% less noise when moving.Reduces range at which enemies can detect the wearer by 40%.",
        icon_url : "./Reduced_Signature_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ReducedNoise | armorBonusFlags.ReducedDetection
    },
    RockSolid : {
        description : "Helps prevent Helldivers from ragdolling when hit.Increases melee damage by 40%.",
        icon_url : "./Rock_Solid_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.StrongerMelee // | armorBonusFlags.NoRagdolling 
    },
    DesertStormer : {
        description : "Provides 40% resistance to fire, gas, acid, and electrical damage.Increases throwing range by 20%.",
        icon_url : "./Desert_Stormer_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceFire | armorBonusFlags.ResistanceGas | armorBonusFlags.ResistanceAcid |  armorBonusFlags.ResistanceElectric | armorBonusFlags.StrongerThrow
    },
    FeetFirst : {
        description : "Wearer makes 50% less noise when moving.Increases point-of-interest identification range by 30%.Provides immunity to leg injuries.",
        icon_url : "./Feet_First_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ReducedNoise // | armorBonusFlags.StrongerPOIRange | armorBonusFlags.NoBrokenLegs
    },
    AdrenoDefibrillator : {
        description : "Provides one-time, short-lived resuscitation upon death, given that the Helldiver's body is still intact.Increases stim effect duration by 2.0s.Provides 50% resistance to arc damage.",
        icon_url : "./Adreno-Defibrillator_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Stim_Longer | armorBonusFlags.ResistanceElectric // | armorBonusFlags.Death_Ressurection 
    },
    BallisticPadding : {
        description : "Provides 25% resistance to chest damage.Provides 25% resistance to explosive damage.Prevents all damage from bleeding if chest hemorrhages.",
        icon_url : "./Ballistic_Padding_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceExplosive | armorBonusFlags.NoBleeding // | armorBonusFlags.ResistanceChest
    },
    ReinforcedEpaulettes : {
        description : "Increases reload speed of primary weapons by 30%.Gives wearer a 50% chance to avoid grievous limb injury.Increases melee damage by 20%.",
        icon_url : "./Reinforced_Epaulettes_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Weapons_FasterReload | armorBonusFlags.ResistanceLimbs | armorBonusFlags.StrongerMelee
    },
    Gunslinger: {
        description : "Increases sidearms reload speed by 40%.Sidearm draw/holster speed increased by 50%.Sidearm recoil reduced by 70%.",
        icon_url : "./Gunslinger_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Weapons_FasterReload // armorBonusFlags.Secondary_FasterHolster // | armorBonusFlags.Secondary_FasterReload |  armorBonusFlags.Secondary_ReducedRecoil
    },
    IntegratedExplosives : {
        description : "Armor explodes 1.5s after the wearer dies.Increases initial inventory and holding capacity of throwables by +2.",
        icon_url : "./Integrated_Explosives_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Grenades_More // | armorBonusFlags.Death_Explode
    },
    Acclimated: {
        description : "Provides 50% resistance to fire, gas, acid, and electrical damage.",
        icon_url : "./Acclimated_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceFire | armorBonusFlags.ResistanceGas | armorBonusFlags.ResistanceAcid | armorBonusFlags.ResistanceElectric
    },
    SiegeReady : {
        description : "Increases reload speed of primary weapons by 30%.Increases ammo capacity of all weapons by 20%. Does not affect weapon backpacks.",
        icon_url : "./Siege-Ready_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Weapons_FasterReload // | armorBonusFlags.Weapons_MoreAmmo
    },
    Unflinching: {
        description : "Helps prevent Helldivers from flinching when hit.Provides a higher armor rating.Markers placed on the map will generate radar scans every 2.0s.",
        icon_url : "./Unflinching_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.HighArmor | armorBonusFlags.ScoutPing // | armorBonusFlags.NoFlinch
    },
    AdvancedFiltration : {
        description : "Provides 80% resistance to gas damage and effects.",
        icon_url : "./Advanced_Filtration_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceGas
    },
    Inflammable: {
        description : "Provides 75% damage resistance to fire, allowing bearer to rest assured in their inflammability.",
        icon_url : "./Inflammable_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceFire
    },
    PeakPhysique : {
        description : "Increases melee damage by 40%.Improves weapons handling with less drag on weapon movement.",
        icon_url : "./Peak_Physique_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.StrongerMelee // | armorBonusFlags.Weapons_StrongerHandling
    },
    ElectricalConduit : {
        description : "Provides 95% resistance to arc damage.",
        icon_url : "./Electrical_Conduit_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceElectric
    },
    Fortified: {
        description : "Further reduces recoil when crouching or prone by 30%.Provides 50% resistance to explosive damage.",
        icon_url : "./Fortified_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Weapons_ReducedRecoil_CrouchProne | armorBonusFlags.ResistanceExplosive
    },
    Scout: {
        description : "Markers placed on the map will generate radar scans every 2.0s.Reduces range at which enemies can detect the wearer by 30%.",
        icon_url : "./Scout_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ReducedDetection | armorBonusFlags.ScoutPing
    },
    EngineeringKit : {
        description : "Further reduces recoil when crouching or prone by 30%.Increases initial inventory and holding capacity of throwables by +2.",
        icon_url : "./Engineering_Kit_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Weapons_ReducedRecoil_CrouchProne | armorBonusFlags.Grenades_More
    },
    MedKit : {
        description : "Increases initial inventory and holding capacity of stims by +2.Increases stim effect duration by 2.0s.",
        icon_url : "./Med-Kit_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Stim_Longer // | armorBonusFlags.Stim_More
    },
    ServoAssisted : {
        description : "Increases throwing range by 30%.Provides +50% limb health.",
        icon_url : "./Servo-Assisted_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.StrongerThrow | armorBonusFlags.ResistanceLimbs
    },
    DemocracyProtects : {
        description : "50% chance to not die when taking lethal damage.Prevents all damage from bleeding if chest hemorrhages.",
        icon_url : "./Democracy_Protects_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Democracy | armorBonusFlags.NoBleeding
    },
    ExtraPadding : {
        description : "Provides a higher armor rating.",
        icon_url : "./Extra_Padding_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.HighArmor
    }
};
export type armorBonusesEnum = typeof armorBonusesEnum[keyof typeof armorBonusesEnum];
