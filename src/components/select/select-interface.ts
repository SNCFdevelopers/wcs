export type SelectCompareFn = (currentValue: any, compareValue: any) => boolean;

export interface SelectChangeEventDetail {
   value: any | any[] | undefined | null;
}
