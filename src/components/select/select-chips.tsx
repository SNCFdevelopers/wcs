import { FunctionalComponent, h } from '@stencil/core';
import { SelectOptionValue } from '../select-option/select-option-interface';

export const SelectChips: FunctionalComponent<{
    option: SelectOptionValue,
    onRemove: (option: SelectOptionValue) => void
}> = ({option, onRemove}) => {

    const style: { [key: string]: string; } = {};

    if (option.chipColor) {
        style['color'] = option.chipColor;
    }
    if (option.chipBackgroundColor) {
        style['background-color'] = option.chipBackgroundColor;
    }

    return (
        <label class="wcs-select-chip" style={style} onClick={(e) => e.stopImmediatePropagation()}>
            <div>{option.displayText}</div>
            <div onClick={() => onRemove(option)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="12" viewBox="0 0 20 12" class="chip">
                    <path d="M2,0 6,4 10,0 12,2 8,6 12,10 10,12 6,8 2,12 0,10 4,6 0,2 2,0"
                          fill={option.chipColor}
                          transform="translate(8 0)"/>
                </svg>
            </div>
        </label>
    );
}
