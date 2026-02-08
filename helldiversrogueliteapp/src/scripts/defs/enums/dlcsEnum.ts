// export enum dlcEnum {
//     Base,
//     Steelwhatever,
// }

export const dlcEnum = ['Base', 'Steelwhatever'] as const;
export type dlcEnum = (typeof dlcEnum)[number];