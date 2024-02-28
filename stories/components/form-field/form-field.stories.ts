import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import formFieldDocumentation from './form-field-documentation.md';
// @ts-ignore
import tooltipOnLabelDocumentation from './tooltip-on-label-documentation.md'
import { getComponentArgs } from '../../utils/args-generation';
const meta: Meta = {
    title: 'Components/Form Field',
    component: 'wcs-form-field',
    argTypes: getComponentArgs('wcs-form-field'),
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
};
export default meta;

interface FormFieldStoriesParams {
    isError: boolean;
}

const Template: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    ${Input(args)}
    ${Select(args)}
    ${Radio(args)}
    ${TextArea(args)}
    ${Switch(args)}
    <br>
    ${Checkbox(args)}
    <br>
    ${Button(args)}
`;

export const Default = Template.bind({});
Default.args = {};

const InputTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
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

const SelectTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What is your country music you're comming from, dude? (select custom)</wcs-label>
        <wcs-select placeholder="Select a country (select custom)" required>
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-hint>You can call the person by his country music</wcs-hint>
        <wcs-error>Your country is not valid</wcs-error>
    </wcs-form-field>


    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What was your last answer ? (select native)</wcs-label>
        <wcs-native-select required>
            <select name="cannot answer this answer twice" id="#selectNatSiveCountry" required>
                <option value="Don't know">I Don't know</option>
                <option value="Yes">Yes</option>
            </select>
        </wcs-native-select>
        <wcs-hint>You cannot answer this answer twice</wcs-hint>
        <wcs-error>Your brain is broken</wcs-error>
    </wcs-form-field>
`;
export const Select = SelectTemplate.bind({});
Select.args = {};

const RadioTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What is your favorite animal?</wcs-label>
        <wcs-radio-group>
            <wcs-radio name="SA" label="SNCF" value="1"></wcs-radio>
            <wcs-radio name="SA" label="SNCF Réseau" value="2"></wcs-radio>
            <wcs-radio name="SA" label="SNCF Voyageurs" value="3"></wcs-radio>
            <wcs-radio name="SA" label="Gares & Connexions" value="4"></wcs-radio>
            <wcs-radio name="SA" label="Rail Logistics Europe (FRET)" value="5"></wcs-radio>
        </wcs-radio-group>
        <wcs-hint>An animal can have several subsidiaries</wcs-hint>
        <wcs-error>Please, give us a valid color</wcs-error>
`;
export const Radio = RadioTemplate.bind({});
Radio.args = {};

const TextAreaTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What do you think about the fact that you are filling a fake form?</wcs-label>
        <wcs-textarea placeholder="Type your message" rows="6" cols="80"></wcs-textarea>
        <wcs-hint>Do anyone will ever read you?</wcs-hint>
        <wcs-error>You can't say that</wcs-error>
    </wcs-form-field>
`;
export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {};

const SwitchTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>I agree to provide personal and corporate data to Jeff</wcs-label>
        <wcs-switch id="error-switch-1" checked="true"></wcs-switch>
        <wcs-hint>This option does not change anything, Jeff will still read you</wcs-hint>
        <wcs-error>Please, \$\{userName\}, try hard</wcs-error>
    </wcs-form-field>
`;
export const Switch = SwitchTemplate.bind({});
Switch.args = {};


const ButtonTemplate: StoryFn<Partial<FormFieldStoriesParams>> = () => html`
    <wcs-button class="wcs-primary">
        Submit
    </wcs-button>
`;
export const Button = ButtonTemplate.bind({});
Button.args = {};

const CheckboxTemplate: StoryFn<Partial<FormFieldStoriesParams>> = () => html`
    <wcs-checkbox>Did you read all questions?</wcs-checkbox>
`;
export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {};

const SelectButtonTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select id="form-field-ex-3" slot="prefix" placeholder="Country" multiple style="width: 200px;">
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-input placeholder="Region"></wcs-input>
        <wcs-button shape="square" slot="suffix" ripple="false">
            <wcs-mat-icon icon="search"></wcs-mat-icon>
        </wcs-button>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-input placeholder="Region"></wcs-input>
        <wcs-button shape="square" slot="suffix" ripple="false">
            <wcs-mat-icon icon="search"></wcs-mat-icon>
        </wcs-button>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select slot="prefix" placeholder="Country" multiple style="width: 200px;">
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-input placeholder="Region"></wcs-input>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select placeholder="All" slot="prefix" style="width: 200px;">
            <wcs-select-option value="France">France</wcs-select-option>
            <wcs-select-option value="Germany">Germany</wcs-select-option>
            <wcs-select-option value="Japan">Japan</wcs-select-option>
        </wcs-select>
        <wcs-select placeholder="Selectionner information..." slot="suffix">
            <wcs-select-option value="nbGares">Nombre de gares</wcs-select-option>
            <wcs-select-option value="nbLignes">Nombre de lignes de trains</wcs-select-option>
        </wcs-select>
    </wcs-form-field>
`;
export const PrefixSuffixGroup = SelectButtonTemplate.bind({});
PrefixSuffixGroup.args = {};

const TooltipOnLabelTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
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

const TooltipOnTwoSelectsTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args: Partial<FormFieldStoriesParams>) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select placeholder="All" slot="prefix">
            <wcs-select-option value="1" chip-background-color="var(--wcs-pink)">One</wcs-select-option>
            <wcs-select-option value="2" chip-background-color="var(--wcs-yellow)" chip-color="var(--wcs-black)">Two</wcs-select-option>
            <wcs-select-option value="3" chip-background-color="var(--wcs-red)">Three</wcs-select-option>
        </wcs-select>
        <wcs-select placeholder="Selectionner..." slot="suffix">
            <wcs-select-option value="1" chip-background-color="var(--wcs-pink)">One</wcs-select-option>
            <wcs-select-option value="2" chip-background-color="var(--wcs-yellow)" chip-color="var(--wcs-black)">Two</wcs-select-option>
            <wcs-select-option value="3" chip-background-color="var(--wcs-red)">Three</wcs-select-option>
        </wcs-select>
    </wcs-form-field>
`;

export const TooltipOnTwoSelects = TooltipOnTwoSelectsTemplate.bind({});
TooltipOnTwoSelects.args = {};

const InputsDateTamplates : StoryFn<Partial<FormFieldStoriesParams>> = (args: Partial<FormFieldStoriesParams>) => html`
    <div style="display: flex; flex-direction: row; gap: var(--wcs-base-margin); align-items: center">
        <wcs-form-field ?is-error=${args.isError}>
            <wcs-label>What is your country ?</wcs-label>
            <wcs-select placeholder="Select a country" required>
                <wcs-select-option>France</wcs-select-option>
                <wcs-select-option>Germany</wcs-select-option>
                <wcs-select-option>Japan</wcs-select-option>
            </wcs-select>
            <wcs-hint>You can call the person by his country music</wcs-hint>
            <wcs-error>Your country is not valid</wcs-error>
        </wcs-form-field>

        <wcs-form-field ?is-error=${args.isError}>
            <wcs-label>Enter your name</wcs-label>
            <wcs-input placeholder="John doe"></wcs-input>
            <wcs-hint>A name is something that describe a person, like you can call the person by his name, you get it?
            </wcs-hint>
            <wcs-error>Your name is not valid, please do the needful following <a
                href="https://www.service-public.fr/particuliers/vosdroits/F1656">this</a>.
            </wcs-error>
        </wcs-form-field>

        <wcs-form-field ?is-error=${args.isError}>
            <wcs-label>Enter first date</wcs-label>
            <wcs-input type="date"></wcs-input>
            <wcs-hint>The first date is the first date to set</wcs-hint>
            <wcs-error>Your first date is not valid</wcs-error>
        </wcs-form-field>
    </div>
`;
export const Inputs = InputsDateTamplates.bind({});
Inputs.args = {};
