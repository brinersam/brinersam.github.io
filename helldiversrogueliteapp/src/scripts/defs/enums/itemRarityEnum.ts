// export enum itemQualityEnum {
//     'Medium',
//     'High',
//     'Low',
// }
export const itemQualityEnum = ['Medium', 'High', 'Low'] as const;
export type itemQualityEnum = typeof itemQualityEnum[number];