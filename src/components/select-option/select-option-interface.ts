export interface SelectOptionValue {
    value: any | any[] | undefined | null;
    displayText: string;
    chipColor?: string;
    chipBackgroundColor?: string;
}

export interface SelectOptionChosedEvent extends SelectOptionValue {
    source: HTMLWcsSelectOptionElement;
}
