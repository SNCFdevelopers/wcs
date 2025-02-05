import { WcsSize } from "../../shared-types";

export interface CounterChangeEventDetail {
    value: number;
}

export type WcsCounterSize = Extract<WcsSize, 'm' | 'l'>;
