import { Component, ComponentInterface, h, Host, Prop, Element } from '@stencil/core';

import { WcsTooltipPosition } from './tooltip-interface';

@Component({
    tag: 'wcs-tooltip',
    styleUrls: ['tooltip.scss'],
    shadow: true,
})
export class Tooltip implements ComponentInterface {
    /**
     * The **id** of the element the tooltip's going to describe.
     *
     * @example
     * ```html
     * <span id="tooltiped">Some content</span>
     * <wcs-tooltip for="tooltiped">A tooltip!</wcs-tooltip>
     * ```
     */
    @Prop({ mutable: false, reflect: true })
    for: string;

    /**
     * Where the tooltip is going to show relative to the element it's describing.
     */
    @Prop({ reflect: true })
    position: WcsTooltipPosition = 'bottom';

    @Element()
    private el!: HTMLWcsTooltipElement;

    before!: CSSStyleDeclaration;
    target: Element;

    componentWillLoad() {
        const target = document.querySelector(`#${this.for}`);
        if (target === null) {
            throw new Error(`Cannot find element with corresponding id: ${this.for}`);
        }
        this.target = target;
        this.before = window.getComputedStyle(this.el, '::before');

        this.listen('mouseenter', 'show');
        this.listen('focus', 'show');
        this.listen('mouseleave', 'hide');
        this.listen('blur', 'hide');
        this.listen('tap', 'hide');
    }

    listen(eventName: string, className: 'hide' | 'show') {
        this.target.addEventListener(eventName, () => {
            this.updatePosition();
            if (className === 'hide') {
                this.el.classList.replace('show', 'hide');
            } else {
                this.el.classList.replace('hide', 'show');
            }
        });
    }

    componentDidRender() {
        this.updatePosition();
    }

    updatePosition() {
        if (!this.target || !this.el.offsetParent) {
            return;
        }

        const parentRect = this.el.offsetParent.getBoundingClientRect();
        const targetRect = this.target.getBoundingClientRect();
        const thisRect = this.el.getBoundingClientRect();
        const borderWidth = 6;
        const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
        const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
        const targetLeft = targetRect.left - parentRect.left;
        const targetTop = targetRect.top - parentRect.top;
        const innerDimensions = this.innerDimensions(this.el);
        let leftBorderOffset = innerDimensions.width / 2 - borderWidth / 2;
        let topBorderOffset = innerDimensions.height / 2 - borderWidth / 2;
        let tooltipLeft: number;
        let tooltipTop: number;
        switch (this.position) {
            case 'top':
                topBorderOffset = 0;
                tooltipLeft = targetLeft + horizontalCenterOffset;
                tooltipTop = targetTop - thisRect.height - borderWidth;
                break;
            case 'bottom':
                topBorderOffset = 0;
                tooltipLeft = targetLeft + horizontalCenterOffset;
                tooltipTop = targetTop + targetRect.height + borderWidth;
                break;
            case 'left':
                leftBorderOffset = 0;
                tooltipLeft = targetLeft - thisRect.width - borderWidth;
                tooltipTop = targetTop + verticalCenterOffset;
                break;
            case 'right':
                leftBorderOffset = 0;
                tooltipLeft = targetLeft + targetRect.width + borderWidth;
                tooltipTop = targetTop + verticalCenterOffset;
                break;
        }

        this.el.style.setProperty('--wcs-tooltip-border-top-offset', topBorderOffset + 'px');
        this.el.style.setProperty('--wcs-tooltip-border-left-offset', leftBorderOffset + 'px');
        this.el.style.left = tooltipLeft + 'px';
        this.el.style.top = tooltipTop + 'px';
    }

    innerDimensions(element: Element) {
        const computedStyle = getComputedStyle(element);

        let height = element.clientHeight; // height with padding
        let width = element.clientWidth; // width with padding

        height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        return { height, width };
    }

    render() {
        return (
            <Host class="hide">
                <slot/>
            </Host>
        );
    }
}
