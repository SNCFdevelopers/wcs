import { Component, ComponentInterface, h, Host, Prop, Element } from '@stencil/core';

import { WcsTooltipPosition } from './tooltip-interface';
import { getOverlay } from '../../utils/overlay';

@Component({
    tag: 'wcs-tooltip',
    // styles are imported globally for now as the content of the tooltip is detached
    // and reattached in the overlay
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

    content: HTMLDivElement;
    target: Element;

    componentWillLoad() {
        const target = document.querySelector(`#${this.for}`);
        if (target === null) {
            throw new Error(`Cannot find element with corresponding id: ${this.for}`);
        }
        this.target = target;

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
                this.content.classList.replace('show', 'hide');
            } else {
                this.content.classList.replace('hide', 'show');
            }
        });
    }

    componentDidRender() {
        const overlay = getOverlay();
        this.content = this.el.shadowRoot.querySelector('.wcs-tooltip-content');
        const nodes = this.el.shadowRoot.querySelector('slot')
                      ? this.el.shadowRoot.querySelector('slot').assignedNodes()
                      : this.content.querySelectorAll('*');
        nodes.forEach(n => this.content.appendChild(n.cloneNode(true)));
        this.content.remove();
        overlay.appendChild(this.content);
        this.updatePosition();
    }

    updatePosition() {
        // Function taken and adapted from https://github.com/PolymerElements/paper-tooltip/blob/master/paper-tooltip.js
        // Thanks ! :-)
        if (!this.target || !this.content.offsetParent) {
            return;
        }

        const parentRect = this.content.offsetParent.getBoundingClientRect();
        const targetRect = this.target.getBoundingClientRect();
        const thisRect = this.content.getBoundingClientRect();
        const borderWidth = 6;
        const horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
        const verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
        const targetLeft = targetRect.left - parentRect.left;
        const targetTop = targetRect.top - parentRect.top;
        let tooltipLeft: number;
        let tooltipTop: number;
        switch (this.position) {
            case 'top':
                tooltipLeft = targetLeft + horizontalCenterOffset;
                tooltipTop = targetTop - thisRect.height - borderWidth;
                break;
            case 'bottom':
                tooltipLeft = targetLeft + horizontalCenterOffset;
                tooltipTop = targetTop + targetRect.height + borderWidth;
                break;
            case 'left':
                tooltipLeft = targetLeft - thisRect.width - borderWidth;
                tooltipTop = targetTop + verticalCenterOffset;
                break;
            case 'right':
                tooltipLeft = targetLeft + targetRect.width + borderWidth;
                tooltipTop = targetTop + verticalCenterOffset;
                break;
        }

        // Clip to the left/right side.
        if (parentRect.left + tooltipLeft + thisRect.width > window.innerWidth) {
            this.content.style.right = '0px';
            this.content.style.left = 'auto';
        } else {
            this.content.style.left = Math.max(0, tooltipLeft) + 'px';
            this.content.style.right = 'auto';
        }
        // Clip the top/bottom side.
        if (parentRect.top + tooltipTop + thisRect.height > window.innerHeight) {
            this.content.style.bottom = (parentRect.height - targetTop) + 'px';
            this.content.style.top = 'auto';
        } else {
            this.content.style.top = Math.max(-parentRect.top, tooltipTop) + 'px';
            this.content.style.bottom = 'auto';
        }
    }

    disconnectedCallback() {
        // TODO: this gets called only at the component creation in ff < 63
        // const overlay = getOverlay();
        // overlay.removeChild(this.content);
    }

    render() {
        return (
            <Host>
                <div class="wcs-tooltip-content hide">
                    <slot/>
                </div>
            </Host>
        );
    }
}
