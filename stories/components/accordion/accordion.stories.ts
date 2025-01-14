import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { html } from 'lit-html';
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Accordion',
    component: 'wcs-accordion',
    argTypes: getComponentArgs('wcs-accordion'),
    parameters: {
        actions: {
            handles: [
                'wcsOpenChange'
            ]
        }
    },
    subcomponents: {
        WcsAccordionContent: 'wcs-accordion-content',
        WcsAccordionHeader: 'wcs-accordion-header',
        WcsAccordionPanel: 'wcs-accordion-panel',
    },
    decorators: [withActions]
};
export default meta;

type AccordionArgs = {
    open: boolean,
    hideActionText: boolean,
    highlight: boolean,
    groupContentWithHeader: boolean
}

const Template: StoryFn<Partial<AccordionArgs>> = (args: Partial<AccordionArgs>) => html`
    <wcs-accordion hide-action-text="${ifDefined(args.hideActionText)}" ?highlight="${args.highlight}" ?group-content-with-header="${args.groupContentWithHeader}">
        <wcs-accordion-panel ?open=${args.open}>
            <wcs-accordion-header>Un premier panel</wcs-accordion-header>
            <wcs-accordion-content>Logoden biniou degemer mat an penn ar bed krib, brudet kontell e outañ doujañ darev
                skeud hennont vuhez, wrierez micherour blot liorzh c’hotoñs war loar. Eus rev feiz onest bremañ eme
                c’hoarvezout levrioù Pederneg, peroked terriñ c’hoant C’hall c’hodell dir c’hoar ha benn, kement
                kouezhañ disul klouar hent ar bev. Mestr Pont-Aven Krouer e kaoued maouez echu drezañ vazh tre genou
                heñvel vrozh kenwerzh, Konk kalet ennañ drezi yaouankiz bouzar kaout fest plijet vugale reiñ.
            </wcs-accordion-content>
        </wcs-accordion-panel>
        <wcs-accordion-panel>
            <wcs-accordion-header>Un second panel</wcs-accordion-header>
            <wcs-accordion-content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nibh at libero rutrum euismod
                    sed eu magna. Sed non efficitur ante, vel aliquet justo. Ut dui libero, finibus suscipit ipsum vel,
                    aliquet tristique mi. Nullam eu tempus enim. Integer nec consectetur ante, a lobortis sem. Vivamus
                    tortor odio, finibus et tempor ac, rhoncus ac eros. Cras posuere elit dolor, nec dignissim erat
                    porttitor ut.
                </p>
                <p>
                    Curabitur tempor lectus eu egestas varius. Vivamus quis lacus at orci auctor iaculis. Curabitur
                    viverra sem eu nulla commodo, et scelerisque mauris auctor. Vivamus rhoncus ex in urna lobortis
                    mollis. Quisque eget molestie massa. Curabitur id sem ac ante venenatis laoreet. Donec vitae dapibus
                    eros, rutrum gravida enim. Morbi semper sollicitudin arcu, semper volutpat libero porttitor in. Sed
                    id est sed magna pellentesque ullamcorper sed vitae erat. In et massa sem. Cras pharetra, metus vel
                    consequat euismod, dui eros pharetra urna, vel imperdiet purus sapien vitae lectus. Duis justo ex,
                    porta eu ultrices facilisis, sagittis in nisi. Etiam sed volutpat risus. Ut quis erat molestie,
                    consectetur nibh vitae, iaculis sem.</p>
            </wcs-accordion-content>
        </wcs-accordion-panel>
        <wcs-accordion-panel>
            <wcs-accordion-header>Un second panel with a very long header text lorem ipsum dolor sit amet</wcs-accordion-header>
            <wcs-accordion-content>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nibh at libero rutrum euismod
                    sed eu magna. Sed non efficitur ante, vel aliquet justo. Ut dui libero, finibus suscipit ipsum vel,
                    aliquet tristique mi. Nullam eu tempus enim. Integer nec consectetur ante, a lobortis sem. Vivamus
                    tortor odio, finibus et tempor ac, rhoncus ac eros. Cras posuere elit dolor, nec dignissim erat
                    porttitor ut.
                </p>
                <p>
                    Curabitur tempor lectus eu egestas varius. Vivamus quis lacus at orci auctor iaculis. Curabitur
                    viverra sem eu nulla commodo, et scelerisque mauris auctor. Vivamus rhoncus ex in urna lobortis
                    mollis. Quisque eget molestie massa. Curabitur id sem ac ante venenatis laoreet. Donec vitae dapibus
                    eros, rutrum gravida enim. Morbi semper sollicitudin arcu, semper volutpat libero porttitor in. Sed
                    id est sed magna pellentesque ullamcorper sed vitae erat. In et massa sem. Cras pharetra, metus vel
                    consequat euismod, dui eros pharetra urna, vel imperdiet purus sapien vitae lectus. Duis justo ex,
                    porta eu ultrices facilisis, sagittis in nisi. Etiam sed volutpat risus. Ut quis erat molestie,
                    consectetur nibh vitae, iaculis sem.</p>
            </wcs-accordion-content>
        </wcs-accordion-panel>
    </wcs-accordion>
`;

export const Default: StoryObj<AccordionArgs> = {
    render: (args: AccordionArgs) => Template(args, this),
    args: {
        open: false,
        highlight: false,
        groupContentWithHeader: false
    }
}

export const WithActionText: StoryObj<AccordionArgs> = {
    render: (args: AccordionArgs) => Template(args, this),
    args: {
        ...Default.args,
        hideActionText: false,
    }
}

export const PanelOnly: StoryObj<AccordionArgs> = {
    render: (args: AccordionArgs) => html`
        <wcs-accordion-panel ?open=${args.open} ?hide-action-text="${ifDefined(args.hideActionText)}" ?highlight="${args.highlight}" ?group-content-with-header="${args.groupContentWithHeader}">
            <wcs-accordion-header>Un premier panel</wcs-accordion-header>
            <wcs-accordion-content>Logoden biniou degemer mat an penn ar bed krib, brudet kontell e outañ doujañ darev
                skeud hennont vuhez, wrierez micherour blot liorzh c’hotoñs war loar. Eus rev feiz onest bremañ eme
                c’hoarvezout levrioù Pederneg, peroked terriñ c’hoant C’hall c’hodell dir c’hoar ha benn, kement
                kouezhañ disul klouar hent ar bev. Mestr Pont-Aven Krouer e kaoued maouez echu drezañ vazh tre genou
                heñvel vrozh kenwerzh, Konk kalet ennañ drezi yaouankiz bouzar kaout fest plijet vugale reiñ.
            </wcs-accordion-content>
        </wcs-accordion-panel>
    `,
    args: {
        ...Default.args
    }
}
