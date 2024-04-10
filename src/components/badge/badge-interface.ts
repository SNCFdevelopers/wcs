import { WcsSize } from "../../shared-types";

export type BadgeShape = 'normal' | 'rounded';

export type BadgeColor = 'initial' | 'lighter';

export type BadgeSize =  Extract<WcsSize, 'l' | 'm' | 's'>
