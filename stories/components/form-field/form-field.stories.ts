import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import formFieldDocumentation from './form-field-documentation.md';
// @ts-ignore
import tooltipOnLabelDocumentation from './tooltip-on-label-documentation.md'
export default {
    title: 'Components/Form Field',
    component: 'wcs-form-field',
    parameters: {
        docs: {
            description: {
                component: formFieldDocumentation
            }
        }
    },
    subcomponents: {
        'WcsLabel': 'wcs-label',
        'WcsHint': 'wcs-hint',
        'WcsError': 'wcs-error',
    },
    decorators: [(story) => html`
        <style>
            wcs-form-field {
                margin: 24px 0;
            }
        </style>${story()}`],
} as Meta;

interface FormFieldStoriesParams {
    isError: boolean;
}

const Template: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    ${Input(args)}
    ${Select(args)}
    ${Radio(args)}
    ${TextArea(args)}
    ${Switch(args)}
`;

export const Default = Template.bind({});
Default.args = {};

const InputTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>Enter your name</wcs-label>
        <wcs-input placeholder="John doe"></wcs-input>
        <wcs-hint>A name is something that describe a person, like you can call the person by his name, you get it?
        </wcs-hint>
        <wcs-error>Your name is not valid, please do the needful following <a
            href="https://www.service-public.fr/particuliers/vosdroits/F1656">this</a>.
        </wcs-error>
    </wcs-form-field>
`;
export const Input = InputTemplate.bind({});
Input.args = {};

const SelectTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What is your country music you're comming from, dude?</wcs-label>
        <wcs-select placeholder="Select a country" required>
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-hint>You can call the person by his country music</wcs-hint>
        <wcs-error>Your country is not valid</wcs-error>
    </wcs-form-field>
`;
export const Select = SelectTemplate.bind({});
Select.args = {};

const RadioTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What is your favorite animal?</wcs-label>
        <wcs-radio-group name="SA">
            <wcs-radio label="SNCF" value="1"></wcs-radio>
            <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
            <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
            <wcs-radio label="Gares & Connexions" value="4"></wcs-radio>
            <wcs-radio label="Rail Logistics Europe (FRET)" value="5"></wcs-radio>
        </wcs-radio-group>
        <wcs-hint>An animal can have several subsidiaries</wcs-hint>
        <wcs-error>Please, give us a valid color</wcs-error>
`;
export const Radio = RadioTemplate.bind({});
Radio.args = {};

const TextAreaTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What do you think about the fact that you are filling a fake form?</wcs-label>
        <wcs-textarea placeholder="Type your message" rows="6" cols="80"></wcs-textarea>
        <wcs-hint>Do anyone will ever read you?</wcs-hint>
        <wcs-error>You can't say that</wcs-error>
    </wcs-form-field>
`;
export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {};

const SwitchTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>I agree to provide personal and corporate data to Jeff</wcs-label>
        <wcs-switch id="error-switch-1" checked="true"></wcs-switch>
        <wcs-hint>This option does not change anything, Jeff will still read you</wcs-hint>
        <wcs-error>Please, \$\{userName\}, try hard</wcs-error>
    </wcs-form-field>
`;
export const Switch = SwitchTemplate.bind({});
Switch.args = {};

const SelectButtonTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select id="form-field-ex-3" slot="prefix" placeholder="Country" multiple>
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-input placeholder="Region"></wcs-input>
        <wcs-button shape="square" slot="suffix" ripple="false">
            <i class="material-icons">search</i>
        </wcs-button>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-input placeholder="Region"></wcs-input>
        <wcs-button shape="square" slot="suffix" ripple="false">
            <i class="material-icons">search</i>
        </wcs-button>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select slot="prefix" placeholder="Country" multiple>
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-input placeholder="Region"></wcs-input>
    </wcs-form-field>
`;
export const PrefixSuffixGroup = SelectButtonTemplate.bind({});
PrefixSuffixGroup.args = {};

const TooltipOnLabelTemplate: Story<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>
            Enter your name
            <wcs-mat-icon size="s" icon="help" id="help"></wcs-mat-icon>
        </wcs-label>
        <wcs-tooltip for="help" position="right">Logoden biniou degemer mat an penn ar bed c’har, se seizh sae Kernev
            diwezhañ foenn goulenn yac’h dad, kastell pegen stivell dre chokolad Montroulez plijet.
        </wcs-tooltip>
        <wcs-input required placeholder="John doe"></wcs-input>
        <wcs-hint>A name is something that describe a person, like you can call the person by his name, you get it?
        </wcs-hint>
        <wcs-error>Your name is not valid, please do the needful following <a
            href="https://www.service-public.fr/particuliers/vosdroits/F1656">this</a>.
        </wcs-error>
    </wcs-form-field>
`;
export const TooltipOnLabel = TooltipOnLabelTemplate.bind({});
TooltipOnLabel.parameters = {
    docs: {
        description: {
            story: tooltipOnLabelDocumentation,
        },
    },
};
TooltipOnLabel.args = {};
