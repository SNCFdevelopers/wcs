export type PredefinedColors = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark' | 'white';
export type Color = PredefinedColors | string;
export type CssClassMap = { [className: string]: boolean };

export * from './components/select-option/select-option-interface';
export * from './components/select/select-interface';
export * from './components/button/button-interface';
