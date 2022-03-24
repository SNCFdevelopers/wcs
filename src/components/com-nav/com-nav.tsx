import { Component, Host, h, Prop, Element, ComponentInterface, State } from '@stencil/core';

@Component({
    tag: 'wcs-com-nav',
    styleUrl: 'com-nav.scss',
    shadow: true,
})
export class ComNav implements ComponentInterface {
    @Element() el!: HTMLWcsComNavElement;

    @Prop() appName: string;

    @State() mobileMenuOpen: boolean = true;
    @State() currentActiveSizing: 'desktop' | 'mobile';
    resizeObserver: ResizeObserver;

    private mobileMenuIconClick() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
    }

    disconnectedCallback() {
        this.resizeObserver.disconnect();
    }

    componentWillLoad(): Promise<void> | void {
        this.resizeObserver = new ResizeObserver(entry => {
            const cr = entry[0].contentRect;
            const paddingRight = cr.right - cr.width;
            const paddingLeft = cr.left;
            if (cr.width < 576 - (paddingLeft + paddingRight)) {
                this.currentActiveSizing = 'mobile';
            } else {
                this.currentActiveSizing = 'desktop';
            }
        });
        this.resizeObserver.observe(document.body);
    }

    render() {
        return (
            <Host>
                <div class="container">
                    <div class="container-left">
                        <div class="app-name">{this.appName}
                            <slot name="app-name"/>
                        </div>
                        <div class="menu-bar">
                            {this.currentActiveSizing === 'desktop' ? <slot/> : null}
                        </div>
                    </div>
                    <div class="container-right">
                        <slot name="actions"/>
                        <span id="mobile-menu-icon" data-mobile-open={this.mobileMenuOpen} onClick={() => this.mobileMenuIconClick()}></span>
                    </div>
                </div>
                <div class="mobile-overlay" data-mobile-open={this.mobileMenuOpen}>
                    {this.currentActiveSizing === 'mobile' ? <slot/> : null}
                </div>
            </Host>
        );
    }

}
