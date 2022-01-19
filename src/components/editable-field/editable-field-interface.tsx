export type ValidateFn<T> = (value: T) => boolean;
export type FormatFn<T> = (value: T) => string;

export interface EditableComponentUpdateEvent {
    newValue: any; // We use any for now, but when components typings will support template, change for parameterized type
    /**
     * Permet de sortir de l'état LOAD pour aller vers l'état DISPLAY
     * À n'utiliser que lorsque la valeur n'est pas systématiquement mise à jour à chaque événement.
     */
    successHandler: () => void;
    errorhandler: () => void;
}

export type EditableFieldType = 'input' | 'textarea' | 'select';
