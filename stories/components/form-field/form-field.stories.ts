import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
const meta: Meta = {
    title: 'Components/Form Field',
    component: 'wcs-form-field',
    argTypes: getComponentArgs('wcs-form-field'),
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
    ${InputTemplate(args, this)}
    ${SelectTemplate(args, this)}
    ${RadioTemplate(args, this)}
    ${TextAreaTemplate(args, this)}
    ${SwitchTemplate(args, this)}
    ${CounterTemplate(args, this)}
    <br>
    ${CheckboxTemplate(args, this)}
    <br>
    ${ButtonTemplate(args, this)}
`;

/**
 * Full form example
 */
export const Default: StoryObj = {
    render: (args) => Template(args, this),
    args: {
        isError: false,
    }
}

const InputTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>Enter your name</wcs-label>
        <wcs-input placeholder="John Doe"></wcs-input>
        <wcs-hint>A name is something that describes a person</wcs-hint>
        <wcs-error>Your name is not valid, please do what is necessary
            <a href="https://www.service-public.fr/particuliers/vosdroits/F1656">here</a>.
        </wcs-error>
    </wcs-form-field>
`;
export const Input: StoryObj = {
    render: (args) => InputTemplate(args, this),
    args: {
        ...Default.args
    }
}

const SelectTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What country music are you coming from, dude? (select custom)</wcs-label>
        <wcs-select placeholder="Select a country (select custom)" required>
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-hint>You can identify the person by the country music he lives in</wcs-hint>
        <wcs-error>Your country is not valid</wcs-error>
    </wcs-form-field>


    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What was your last answer ? (select native)</wcs-label>
        <wcs-native-select required>
            <select name="last-answer" id="native-select-country" required>
                <option value="Don't know">I Don't know</option>
                <option value="Yes">Yes</option>
            </select>
        </wcs-native-select>
        <wcs-hint>You cannot answer this answer twice</wcs-hint>
        <wcs-error>Your brain is broken</wcs-error>
    </wcs-form-field>
`;
export const Select: StoryObj = {
    render: (args) => SelectTemplate(args, this),
    args: {
        ...Default.args
    }
}

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
        <wcs-error>Give us a valid company</wcs-error>
        <wcs-hint>An animal can have several subsidiaries</wcs-hint>
`;
export const Radio: StoryObj = {
    render: (args) => RadioTemplate(args, this),
    args: {
        ...Default.args
    }
}

const TextAreaTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>What do you think about the fact that you are filling a fake form?</wcs-label>
        <wcs-textarea placeholder="Type your message" rows="6" cols="80"></wcs-textarea>
        <wcs-hint>Does anyone will ever read you?</wcs-hint>
        <wcs-error>You can't say that</wcs-error>
    </wcs-form-field>
`;
export const TextArea: StoryObj = {
    render: (args) => TextAreaTemplate(args, this),
    args: {
        ...Default.args
    }
}

const SwitchTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>Agreement</wcs-label>
        <wcs-switch id="error-switch-1" checked="true">
            I agree to provide personal and corporate data to Jeff
        </wcs-switch>
        <wcs-hint>This option does not change anything, Jeff will still read you</wcs-hint>
        <wcs-error>Not really optional, so please check this</wcs-error>
    </wcs-form-field>
`;
export const Switch: StoryObj = {
    render: (args) => SwitchTemplate(args, this),
    args: {
        ...Default.args
    }
}

const CounterTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => {
    return html`
        <wcs-form-field ?is-error=${args.isError}>
            <wcs-label>Number of questions you understood</wcs-label>
            <wcs-counter label="Number of passengers" min="0" max="120" step="12"></wcs-counter>
            <wcs-hint>The number of understood questions cannot exceed the number of comprehensible questions</wcs-hint>
            <wcs-error>0 is not a valid number, the number cannot exceed 8</wcs-error>
        </wcs-form-field>
    `;
};
export const Counter: StoryObj = {
    render: (args) => CounterTemplate(args, this),
    args: {
        ...Default.args
    }
}


const ButtonTemplate: StoryFn<Partial<FormFieldStoriesParams>> = () => html`
    <wcs-button class="wcs-primary" (click)="">
        Submit
    </wcs-button>
`;
export const Button: StoryObj = {
    render: (args) => ButtonTemplate(args, this),
    args: {
        ...Default.args
    }
}

const CheckboxTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>Confirmation</wcs-label>
        <wcs-checkbox>Did you read all questions?</wcs-checkbox>
        <wcs-hint>Make sure all questions are understood</wcs-hint>
        <wcs-error>You are lying</wcs-error>
    </wcs-form-field>
`;
export const Checkbox: StoryObj = {
    render: (args) => CheckboxTemplate(args, this),
    args: {
        ...Default.args
    }
}

const PrefixSuffixGroupTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-select id="form-field-ex-3" slot="prefix" placeholder="Country" multiple style="width: 200px;">
            <wcs-select-option>France</wcs-select-option>
            <wcs-select-option>Germany</wcs-select-option>
            <wcs-select-option>Japan</wcs-select-option>
        </wcs-select>
        <wcs-input placeholder="Region"></wcs-input>
        <wcs-button shape="square" slot="suffix" ripple="false">
            <wcs-mat-icon icon="search" role="img" aria-label="Search"></wcs-mat-icon>
        </wcs-button>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-input placeholder="Region"></wcs-input>
        <wcs-button shape="square" slot="suffix" ripple="false">
            <wcs-mat-icon icon="search" role="img" aria-label="Search"></wcs-mat-icon>
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
        <wcs-select placeholder="Select data..." slot="suffix">
            <wcs-select-option value="nbStations">Number of train stations</wcs-select-option>
            <wcs-select-option value="nbLines">Number of train lines</wcs-select-option>
        </wcs-select>
    </wcs-form-field>

    <wcs-form-field ?is-error=${args.isError}>
        <wcs-native-select slot="prefix" style="width: 200px;">
            <select name="select-default" id="select-default">
                <option disabled selected hidden>All</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
            </select>
        </wcs-native-select>
        <wcs-native-select slot="suffix">
            <select name="select-default" id="select-default">
                <option disabled selected hidden>Placeholder du select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3" disabled>Three</option>
            </select>
        </wcs-native-select>
    </wcs-form-field>
`;
export const PrefixSuffixGroup: StoryObj = {
    render: (args) => PrefixSuffixGroupTemplate(args, this),
    args: {
        ...Default.args
    }
}

const TooltipOnLabelTemplate: StoryFn<Partial<FormFieldStoriesParams>> = (args) => html`
    <wcs-form-field ?is-error=${args.isError}>
        <wcs-label>
            Enter your name
            <wcs-mat-icon size="s" icon="help" id="help"></wcs-mat-icon>
        </wcs-label>
        <wcs-tooltip for="help" position="right">
            Logoden biniou degemer mat an penn ar bed c’har, se seizh sae Kernev diwezhañ foenn goulenn yac’h dad,
            kastell pegen stivell dre chokolad Montroulez plijet.
        </wcs-tooltip>
        <wcs-input required placeholder="John Doe"></wcs-input>
        <wcs-hint>A name is something that describe a person, like you can call the person by his name, you get it?</wcs-hint>
        <wcs-error>Your name is not valid, please do what is necessary
            <a href="https://www.service-public.fr/particuliers/vosdroits/F1656">here</a>.
        </wcs-error>
    </wcs-form-field>
`;
/**
 * In the most complex cases, where a hint would not be enough, you can use a tooltip on the label of a wcs field to add
 * information to the user (for example with rich html content).
 *
 * However, try to limit this scenario as much as possible as it complicates the user experience and relies on less
 * discoverable content.
 */
export const TooltipOnLabel: StoryObj = {
    render: (args) => TooltipOnLabelTemplate(args, this),
    args: {
        ...Default.args
    }
}
