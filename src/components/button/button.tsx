import { Component, Prop } from '@stencil/core';

export type ButtonType = 'button' | 'submit';

@Component({
    tag: 'wcs-button'
})
export class Button {
    @Prop() type: ButtonType = 'button';
    @Prop() href: string;

    render() {
        const TagType = this.href !== undefined ? 'a' : 'button';
        const attrs = this.href !== undefined
            ? { href: this.href }
            : { type: this.type };

        return (
            <TagType
                {...attrs}
                class="btn btn-primary">
                <slot />
            </TagType>
        );
    }
}