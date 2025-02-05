import { WcsSize } from "../../shared-types";

export type ModalSize = Extract<WcsSize, 's' | 'm' | 'l' | 'xl'>;
