import { Component, ComponentInterface, EventEmitter, Prop, Event, Element, Host, h } from '@stencil/core';
import { WcsChipMode, WcsChipVariant } from './chip-interface';

type ChipFocusDirection = 'previous' | 'next';

/**
 * The chip component is a small, interactive element that can be used to represent an input, filter, or tag.
 * It can be in one of two modes: 'selectable' or 'dismissible'.
 * - In 'selectable' mode, the chip can be selected or deselected, and emits an event when clicked.
 * - In 'dismissible' mode, the chip can be dismissed (removed) by clicking a dismiss icon, and emits an event when the dismiss icon is clicked.
 *
 * @cssprop --wcs-chip-height - Height of the chip
 * @cssprop --wcs-chip-font-size - Font size of the chip text
 * @cssprop --wcs-chip-font-weight - Font weight of the chip text
 *
 * @cssprop --wcs-chip-focus-outline-border-width - Border width of the chip focus outline
 *
 * @cssprop --wcs-chip-padding-vertical - Vertical padding (top - bottom) of the chip
 * @cssprop --wcs-chip-padding-horizontal - Horizontal padding (left - right) of the chip
 * @cssprop --wcs-chip-padding-horizontal-dismissible - Horizontal padding (left - right) of the chip with 'dismissible' mode
 *
 * @cssprop --wcs-chip-selectable-background-color - Background color of the chip with 'selectable' mode in default state
 * @cssprop --wcs-chip-selectable-background-color-pressed - Background color of the chip with 'selectable' mode when pressed
 * @cssprop --wcs-chip-selectable-background-color-hover - Background color of the chip with 'selectable' mode when hovered
 * @cssprop --wcs-chip-selectable-background-color-selected - Background color of the chip with 'selectable' mode when selected
 * @cssprop --wcs-chip-selectable-background-color-selected-hover - Background color of the chip with 'selectable' mode when selected and hovered
 * @cssprop --wcs-chip-selectable-background-color-selected-pressed - Background color of the chip with 'selectable' mode when selected and pressed
 * @cssprop --wcs-chip-selectable-background-color-selected-disabled - Background color of the chip with 'selectable' mode when selected and disabled
 *
 * @cssprop --wcs-chip-selectable-color - Text color of the chip with 'selectable' mode in default state
 * @cssprop --wcs-chip-selectable-color-hover - Text color of the chip with 'selectable' mode when hovered
 * @cssprop --wcs-chip-selectable-color-pressed - Text color of the chip with 'selectable' mode when pressed
 * @cssprop --wcs-chip-selectable-color-disabled - Text color of the chip with 'selectable' mode when disabled
 * @cssprop --wcs-chip-selectable-color-selected - Text color of the chip with 'selectable' mode when selected
 * @cssprop --wcs-chip-selectable-color-selected-hover - Text color of the chip with 'selectable' mode when selected and hovered
 * @cssprop --wcs-chip-selectable-color-selected-pressed - Text color of the chip with 'selectable' mode when selected and pressed
 *
 * @cssprop --wcs-chip-border-radius - Border radius of the chip
 * @cssprop --wcs-chip-border-line-width - Border line width of the chip
 * @cssprop --wcs-chip-selectable-border-color - Border color of the chip with 'selectable' mode in default state
 * @cssprop --wcs-chip-selectable-border-color-hover - Border color of the chip with 'selectable' mode when hovered
 * @cssprop --wcs-chip-selectable-border-color-pressed - Border color of the chip with 'selectable' mode when pressed
 * @cssprop --wcs-chip-selectable-border-color-disabled - Border color of the chip with 'selectable' mode when disabled
 *
 * @cssprop --wcs-chip-selectable-content-gap - Gap between content elements in chip with 'selectable' mode
 * @cssprop --wcs-chip-selectable-focus-outline-color - Focus outline color of the chip with 'selectable' mode
 *
 * @cssprop --wcs-chip-dismissible-content-gap - Gap between content elements in chip with 'dismissible' mode
 * @cssprop --wcs-chip-dismissible-padding-right - Right padding of the chip with 'dismissible' mode
 * @cssprop --wcs-chip-dismissible-button-outline-radius - Outline radius of the button for the chip with 'dismissible' mode
 *
 * @cssprop --wcs-chip-dismissible-primary-focus-outline-color - Focus outline color of the chip with 'dismissible' mode and 'primary' variant
 * @cssprop --wcs-chip-dismissible-primary-border-color - Border color of the chip with 'dismissible' mode and 'primary' variant
 * @cssprop --wcs-chip-dismissible-primary-border-color-disabled - Border color of the chip with 'dismissible' mode and 'primary' variant when disabled
 * @cssprop --wcs-chip-dismissible-primary-color - Text color of the chip with 'dismissible' mode and 'primary' variant
 * @cssprop --wcs-chip-dismissible-primary-color-hover - Text color of the chip with 'dismissible' mode and 'primary' variant when hovered
 * @cssprop --wcs-chip-dismissible-primary-color-pressed - Text color of the chip with 'dismissible' mode and 'primary' variant when pressed
 * @cssprop --wcs-chip-dismissible-primary-color-disabled - Text color of the chip with 'dismissible' mode and 'primary' variant when disabled
 * @cssprop --wcs-chip-dismissible-primary-background-color - Background color of the chip with 'dismissible' mode and 'primary' variant
 * @cssprop --wcs-chip-dismissible-primary-background-color-hover - Background color of the chip with 'dismissible' mode and 'primary' variant when hovered
 * @cssprop --wcs-chip-dismissible-primary-background-color-pressed - Background color of the chip with 'dismissible' mode and 'primary' variant when pressed
 * @cssprop --wcs-chip-dismissible-primary-background-color-disabled - Background color of the chip with 'dismissible' mode and 'primary' variant when disabled
 *
 * @cssprop --wcs-chip-dismissible-secondary-button-focus-outline-color - Button focus outline color of the chip with 'dismissible' mode and 'secondary' variant
 * @cssprop --wcs-chip-dismissible-secondary-border-color - Border color of the chip with 'dismissible' mode and 'secondary' variant
 * @cssprop --wcs-chip-dismissible-secondary-border-color-disabled - Border color of the chip with 'dismissible' mode and 'secondary' variant when disabled
 * @cssprop --wcs-chip-dismissible-secondary-color - Text color of the chip with 'dismissible' mode and 'secondary' variant
 * @cssprop --wcs-chip-dismissible-secondary-color-disabled - Text color of the chip with 'dismissible' mode and 'secondary' variant when disabled
 * @cssprop --wcs-chip-dismissible-secondary-background-color - Background color of the chip with 'dismissible' mode and 'secondary' variant
 * @cssprop --wcs-chip-dismissible-secondary-button-background-color - Button background color of the chip with 'dismissible' mode and 'secondary' variant
 * @cssprop --wcs-chip-dismissible-secondary-button-background-color-hover - Button background color of the chip with 'dismissible' mode and 'secondary' variant when hovered
 * @cssprop --wcs-chip-dismissible-secondary-button-background-color-pressed - Button background color of the chip with 'dismissible' mode and 'secondary' variant when pressed
 * @cssprop --wcs-chip-dismissible-secondary-button-background-color-disabled - Button background color of the chip with 'dismissible' mode and 'secondary' variant when disabled
 */
@Component({
    tag: 'wcs-chip',
    styleUrl: 'chip.scss',
    shadow: true
})
export class Chip implements ComponentInterface {
    @Element() el!: HTMLWcsChipElement;
    /**
     * Unique value representing the chip identifier in events.
     */
    @Prop() value: string;

    /**
     * Text label displayed on the chip.
     */
    @Prop() label: string;

    /**
     * If `true`, the chip is selected.
     * This property is only used in 'selectable' mode.
     */
    @Prop({ reflect: true }) selected = false;

    /**
     * If `true`, the chip is open.
     * This property is used to control the visibility of the chip in the dismissible mode.
     * When the user clicks the dismiss icon, this property automatically becomes `false`, hiding the chip.
     */
    @Prop({ reflect: true }) open = true;

    /**
     * If `true`, the chip is disabled.
     * The chip will not respond to click events and will not emit any events.
     * This property is used in both 'selectable' and 'dismissible' modes.
     */
    @Prop({ reflect: true }) disabled = false;

    /**
     * Defines the visual style of the chip for the dismissible mode.
     */
    @Prop({ reflect: true }) variant: WcsChipVariant = 'primary';

    /**
     * Defines the mode of the chip.
     * Can be 'selectable' or 'dismissible'.
     * - 'selectable': The chip can be selected and emits an event when clicked.
     * - 'dismissible': The chip can be dismissed (removed) and emits an event when the dismiss icon is clicked.
     */
    @Prop({ reflect: true }) mode: WcsChipMode = 'selectable';

    /**
     * Emitted when the chip is clicked in 'selectable' mode.
     */
    @Event() wcsChipSelectChange: EventEmitter<{ value: string; selected: boolean }>;

    /**
     * Emitted when the dismiss icon is clicked in 'dismissible' mode.
     */
    @Event() wcsChipDismiss: EventEmitter<{ value: string }>;


    private select() {
        this.selected = !this.selected; // Toggle the selected state
        this.wcsChipSelectChange.emit({ value: this.value, selected: this.selected });
    }

    private dismiss() {
        this.open = false;
        this.wcsChipDismiss.emit({ value: this.value });

        const nextChip = this.findAdjacentActionableChip('next');
        if (nextChip) {
            this.focusChip(nextChip);
        } else {
            const previousChip = this.findAdjacentActionableChip('previous');
            if (previousChip) {
                this.focusChip(previousChip)
            };
        }
    }

    private findAdjacentActionableChip(direction: ChipFocusDirection): HTMLWcsChipElement | null {
        const getSibling = (el: Element) => direction === 'next' 
            ? el.nextElementSibling 
            : el.previousElementSibling;

        let currentElement = getSibling(this.el);

        while (currentElement) {
            if (this.isActionableChip(currentElement)) {
                return currentElement;
            }
            currentElement = getSibling(currentElement);
        }

        return null;
    }

    private isActionableChip(element: Element | null): element is HTMLWcsChipElement {
        return element instanceof HTMLElement
            && element.tagName === 'WCS-CHIP'
            && !(element as HTMLWcsChipElement).disabled;
    }

    private focusChip(chip: HTMLWcsChipElement): void {
        if (chip.mode === 'selectable') {
            chip.focus();
        } else if (chip.mode === 'dismissible') {
            chip.shadowRoot?.querySelector('button')?.focus();
        }
    }

    private handleClick() {
        if (this.disabled || this.mode !== 'selectable') {
            return;
        }
        this.select();
    };

    private handleDismiss = (event: Event) => {
        if (this.disabled || this.mode !== 'dismissible') {
            return;
        }
        event.stopPropagation(); // Prevent the click event from bubbling up to the chip click handler
        this.dismiss();
    };

    private handleKeydown(ev) {
        if (this.disabled) {
            return;
        }
        if (this.mode === 'selectable') {
            if (ev.key === 'Enter' || ev.key === ' ') {
                this.select();
            }
        } else if (this.mode === 'dismissible') {
            if (ev.key === 'Delete' || ev.key === 'Backspace') {
                this.dismiss();
            }
        }
    }

    render() {
        const commonProps = {
            'aria-disabled': this.disabled ? 'true' : null
        };

        if (this.mode === 'selectable') {
            return (
                <Host
                    {...commonProps}
                    role="checkbox"
                    aria-checked={this.selected ? 'true' : 'false'}
                    tabindex={this.disabled ? -1 : 0}
                    onClick={this.handleClick.bind(this)}
                    onKeyDown={this.handleKeydown.bind(this)}
                >
                    {this.selected && (
                        <svg class="check-icon" aria-hidden="true" width="12" height="12" viewBox="0 0 24 24"
                             fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M23.712 8.3011L8.0292 23.7157C7.6356 24.095 6.9984 24.095 6.6264 23.7157L0.288 17.4955C-0.096 17.1226 -0.096 16.496 0.288 16.1192L2.1552 14.2739C2.5536 13.9036 3.1776 13.9036 3.5532 14.2739L6.6264 17.2764C6.9984 17.6583 7.6356 17.6583 8.0292 17.2764L20.4384 5.08081C20.8236 4.70662 21.4536 4.70662 21.8364 5.08081L23.712 6.91841C24.096 7.29516 24.096 7.91923 23.712 8.3011Z"
                                fill="white" />
                        </svg>
                    )}
                    <span>{this.label}</span>
                </Host>
            );
        } else {
            return (
                <Host
                    {...commonProps}
                >
                    <span>{this.label}</span>
                    <button
                        aria-label={`Supprimer ${this.label}`}
                        disabled={this.disabled}
                        onClick={this.handleDismiss.bind(this)}
                        onKeyDown={this.handleKeydown.bind(this)}
                    >
                        <svg class="dismiss-icon" aria-hidden="true" width="12" height="12" viewBox="0 0 24 24"
                             fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.2656 12.0298L19.588 6.72176C20.1908 6.12119 20.1061 5.05213 19.5034 4.45043C18.9006 3.84986 17.914 3.84986 17.3112 4.45043L11.9887 9.7596L6.66743 4.45043C6.06351 3.84986 5.07691 3.84986 4.47412 4.45043C3.87132 5.05213 3.82843 6.07942 4.43122 6.68112L9.75365 11.9892L4.43122 17.2983C3.82843 17.8989 3.87132 18.9262 4.47412 19.5279C5.07691 20.1296 6.10527 20.1702 6.70807 19.5685L12.0305 14.2605L17.3112 19.5279C17.914 20.1296 18.9006 20.1296 19.5034 19.5279C20.1061 18.9262 20.149 17.8989 19.5462 17.2983L14.2656 12.0298Z"
                                fill="currentColor" />
                        </svg>
                    </button>
                </Host>
            );
        }
    }
}

