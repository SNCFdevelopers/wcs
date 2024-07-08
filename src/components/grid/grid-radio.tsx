import { FunctionalComponent, h } from '@stencil/core';
import { WcsGridRow } from "./grid-interface";

interface GridRadioProps {
    checked: boolean;
    row: WcsGridRow;
    rowIndex: number,
    totalRows: number,
    onClick: (row: WcsGridRow) => void;
}

export const GridRadio: FunctionalComponent<GridRadioProps> = (
    {
        checked,
        row,
        rowIndex,
        totalRows,
        onClick
    }) => {
    let input: HTMLInputElement;
    return (
        <div class={`grid-radio ${checked ? 'checked' : ''}`} onClick={_ => input.click()}>
            <input type="radio"
                   name="selection"
                   aria-setsize={totalRows}
                   aria-posinset={rowIndex}
                   tabindex="-1"
                   checked={checked}
                   aria-checked={`${checked}`}
                   ref={(el) => (input = el)}
                   onClick={_ => onClick(row)}>
            </input>
        </div>
    );
}
