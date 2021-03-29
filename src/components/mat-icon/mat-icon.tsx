import { Component, ComponentInterface, h, Host, Prop, State, Watch } from '@stencil/core';

@Component({
    tag: 'wcs-mat-icon',
    styleUrl: 'mat-icon.scss',
    shadow: true
})
export class MatIcon implements ComponentInterface {
    /**
     * Use the icon name from Material Icons
     */
    @Prop() icon: string;
    /**
     * Size of the icon
     */
    @Prop() size: 's' | 'm' | 'l' | 'xl' = 'm';
    /**
     * Family of the icon
     */
    @Prop() family: 'filled' | 'outlined' | 'twotone' | 'rounded' | 'sharp' = 'filled';
    @State() familyFile: string;
    @State() familyClass: string;

    componentWillLoad() {
        this.onFamilyChange();
    }

    componentDidLoad() {
        this.appendMaterialStylesheet();
    }

    private appendMaterialStylesheet() {
        // Add material font to page DOM since font-face doesn't work within Shadow DOM.
        let element = document.querySelector(`link[href="${this.familyFile}"]`);

        // Only append the element if it's not yet present
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', 'stylesheet');
            element.setAttribute('href', this.familyFile);
            document.head.appendChild(element);
        }
    }

    @Watch('family')
    onFamilyChange() {
        this.familyFile = 'https://fonts.googleapis.com/icon?family=';
        switch (this.family) {
            case 'filled':
                this.familyFile += 'Material+Icons';
                this.familyClass = 'material-icons';
                break;
            case 'outlined':
                this.familyFile += 'Material+Icons+Outlined';
                this.familyClass = 'material-icons-outlined';
                break;
            case 'twotone':
                this.familyFile += 'Material+Icons+Two+Tone';
                this.familyClass = 'material-icons-two-tone';
                break;
            case 'rounded':
                this.familyFile += 'Material+Icons+Round';
                this.familyClass = 'material-icons-round';
                break;
            case 'sharp':
                this.familyFile += 'Material+Icons+Sharp';
                this.familyClass = 'material-icons-sharp';
                break;
        }
        this.appendMaterialStylesheet();
    }

    render() {
        return (
            <Host>
                <link rel="stylesheet" type="text/css" href={this.familyFile}/>
                <i class={this.familyClass + ' size-' + this.size}>
                    {this.icon}
                </i>
            </Host>
        );
    }
}
