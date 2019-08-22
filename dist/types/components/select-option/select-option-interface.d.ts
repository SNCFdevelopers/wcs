export interface SelectOptionValue {
    value: any | any[] | undefined | null;
    displayText: string;
}
export interface SelectOptionChosedEvent extends SelectOptionValue {
    source: HTMLWcsSelectOptionElement;
}
