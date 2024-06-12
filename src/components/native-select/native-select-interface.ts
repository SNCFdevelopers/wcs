import { WcsSize } from "../../shared-types";

export type WcsNativeSelectSize = Extract<WcsSize, 'l' | 'm'>;
