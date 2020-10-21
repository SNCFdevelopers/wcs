export interface RadioValue {
    value: any | any[] | undefined | null;
    label: string;
}

export interface RadioChosedEvent extends RadioValue {
    source: HTMLWcsRadioElement;
}
