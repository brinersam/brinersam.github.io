interface armorBonus
{
    description : string,
    icon_url : string,
    armorBonusTags : armorBonusFlags
}

export const armorBonusFlags = {
    None : 0,
    DmgToStam : 1 << 0,
    HighArmor : 1 << 0,
    Wildwest : 1 << 0,
    ScoutPing : 1 << 0,
    Democracy : 1 << 0,

    ReducedNoise : 1 << 0,
    ReducedDetection : 1 << 0,

    NoRagdolling : 1 << 0,
    NoBleeding : 1 << 0,
    NoBrokenLegs : 1 << 0,
    NoFlinch : 1 << 0,
    NoBrokenLimbs : 1 << 0,

    ResistanceAcid : 1 << 0,
    ResistanceExplosive : 1 << 0,
    ResistanceElectric : 1 << 0,
    ResistanceFire : 1 << 0,
    ResistanceGas : 1 << 0,

    ResistanceChest : 1 << 0,
    ResistanceLimbs : 1 << 0,

    StrongerThrow: 1 << 0,
    StrongerMelee : 1 << 0,
    StrongerPOIRange : 1 << 0,

    Secondary_FasterReload : 1 << 0,
    Secondary_ReducedRecoil : 1 << 0,
    Secondary_FasterHolster : 1 << 0,

    Primary_FasterReload  : 1 << 0,

    Weapons_MoreAmmo  : 1 << 0,
    Weapons_StrongerHandling : 1 << 0,
    Weapons_ReducedRecoil_CrouchProne : 1 << 0,

    Death_Ressurection : 1 << 0,
    Death_Explode : 1 << 0,

    Grenades_More : 1 << 0,

    Stim_Longer : 1 << 0,
    Stim_More : 1 << 0,


} as const;
export type armorBonusFlags = typeof armorBonusFlags[keyof typeof armorBonusFlags];




export const armorBonusesEnum = { // todo look up how to reinforce intelisence helping while typizing this to whatever it is
    SupplementaryAdrenaline : {
        description : "When the wearer takes damage, they regain some stamina.Provides a higher armor rating.",
        icon_url : "./Supplementary_Adrenaline_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.DmgToStam | armorBonusFlags.HighArmor
    },
    ReducedSignature : {
        description : "Wearer makes 50% less noise when moving.Reduces range at which enemies can detect the wearer by 40%.",
        icon_url : "./Reduced_Signature_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ReducedNoise | armorBonusFlags.ReducedDetection
    },
    RockSolid : {
        description : "Helps prevent Helldivers from ragdolling when hit.Increases melee damage by 40%.",
        icon_url : "./Rock_Solid_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.NoRagdolling | armorBonusFlags.StrongerMelee
    },
    DesertStormer : {
        description : "Provides 40% resistance to fire, gas, acid, and electrical damage.Increases throwing range by 20%.",
        icon_url : "./Desert_Stormer_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceFire | armorBonusFlags.ResistanceGas | armorBonusFlags.ResistanceAcid |  armorBonusFlags.ResistanceElectric | armorBonusFlags.StrongerThrow
    },
    FeetFirst : {
        description : "Wearer makes 50% less noise when moving.Increases point-of-interest identification range by 30%.Provides immunity to leg injuries.",
        icon_url : "./Feet_First_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ReducedNoise | armorBonusFlags.StrongerPOIRange | armorBonusFlags.NoBrokenLegs
    },
    AdrenoDefibrillator : {
        description : "Provides one-time, short-lived resuscitation upon death, given that the Helldiver's body is still intact.Increases stim effect duration by 2.0s.Provides 50% resistance to arc damage.",
        icon_url : "./Adreno-Defibrillator_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Death_Ressurection | armorBonusFlags.Stim_Longer | armorBonusFlags.ResistanceElectric
    },
    BallisticPadding : {
        description : "Provides 25% resistance to chest damage.Provides 25% resistance to explosive damage.Prevents all damage from bleeding if chest hemorrhages.",
        icon_url : "./Ballistic_Padding_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceChest | armorBonusFlags.ResistanceExplosive | armorBonusFlags.NoBleeding
    },
    ReinforcedEpaulettes : {
        description : "Increases reload speed of primary weapons by 30%.Gives wearer a 50% chance to avoid grievous limb injury.Increases melee damage by 20%.",
        icon_url : "./Reinforced_Epaulettes_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Primary_FasterReload | armorBonusFlags.ResistanceLimbs | armorBonusFlags.StrongerMelee
    },
    Gunslinger: {
        description : "Increases sidearms reload speed by 40%.Sidearm draw/holster speed increased by 50%.Sidearm recoil reduced by 70%.",
        icon_url : "./Gunslinger_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Secondary_FasterReload | armorBonusFlags.Secondary_FasterHolster | armorBonusFlags.Secondary_ReducedRecoil
    },
    IntegratedExplosives : {
        description : "Armor explodes 1.5s after the wearer dies.Increases initial inventory and holding capacity of throwables by +2.",
        icon_url : "./Integrated_Explosives_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Death_Explode | armorBonusFlags.Grenades_More
    },
    Acclimated: {
        description : "Provides 50% resistance to fire, gas, acid, and electrical damage.",
        icon_url : "./Acclimated_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.ResistanceFire | armorBonusFlags.ResistanceGas | armorBonusFlags.ResistanceAcid | armorBonusFlags.ResistanceElectric
    },
    SiegeReady : {
        description : "Increases reload speed of primary weapons by 30%.Increases ammo capacity of all weapons by 20%. Does not affect weapon backpacks.",
        icon_url : "./Siege-Ready_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Primary_FasterReload | armorBonusFlags.Weapons_MoreAmmo
    },
    Unflinching: {
        description : "Helps prevent Helldivers from flinching when hit.Provides a higher armor rating.Markers placed on the map will generate radar scans every 2.0s.",
        icon_url : "./Unflinching_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.NoFlinch | armorBonusFlags.HighArmor | armorBonusFlags.ScoutPing
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
        armorBonusTags : armorBonusFlags.StrongerMelee | armorBonusFlags.Weapons_StrongerHandling
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
        armorBonusTags : armorBonusFlags.ScoutPing | armorBonusFlags.ReducedDetection
    },
    EngineeringKit : {
        description : "Further reduces recoil when crouching or prone by 30%.Increases initial inventory and holding capacity of throwables by +2.",
        icon_url : "./Engineering_Kit_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Weapons_ReducedRecoil_CrouchProne | armorBonusFlags.Grenades_More
    },
    MedKit : {
        description : "Increases initial inventory and holding capacity of stims by +2.Increases stim effect duration by 2.0s.",
        icon_url : "./Med-Kit_Armor_Passive_Icon",
        armorBonusTags : armorBonusFlags.Stim_More | armorBonusFlags.Stim_Longer
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
} as const;
export type armorBonusesEnum = typeof armorBonusesEnum[keyof typeof armorBonusesEnum];