// export enum itemQualityEnum {
//     'Medium',
//     'High',
//     'Low',
// }
export const itemQualityEnum = ['Medium', 'High', 'Low', 'Very High'] as const;
export type itemQualityEnum = typeof itemQualityEnum[number];