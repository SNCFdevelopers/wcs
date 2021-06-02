export type ValidateFn<T> = (value: T) => boolean;
export type FormatFn<T> = (value: T) => string;

export interface EditableComponentUpdateEvent<T> {
    newValue: T;
    /**
     * Permet de sortir de l'état LOAD pour aller vers l'état DISPLAY
     * À n'utiliser que lorsque la valeur n'est pas systématiquement mise à jour à chaque événement.
     */
    successHandler: () => void;
    errorhandler: () => void;
}
