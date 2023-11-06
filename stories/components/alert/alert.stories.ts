import { Meta, StoryFn, StoryObj } from "@storybook/web-components";
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from "../../utils/args-generation";
import { html } from "lit-html";
import { WcsAlertIntent } from "../../../src/components/alert/alert-interface";

const meta: Meta = {
    title: 'Components/Alert',
    component: 'wcs-alert',
    argTypes: getComponentArgs('wcs-alert'),
    decorators: [withActions],
    parameters: {
        actions: {
            handles: [
                'wcsAlertDismiss',
            ]
        }
    },
}
export default meta;

type AlertArgs = {
    intent: WcsAlertIntent,
    show: boolean,
    showProgressBar: boolean,
    timeout: number,
}

const Template: StoryFn<Partial<AlertArgs>> = (args) => html`
    <wcs-alert intent=${args.intent}
               ?show=${args.show} 
               ?show-progress-bar=${args.showProgressBar} 
               timeout=${ifDefined(args.timeout)}>
        <span slot="title">Title</span>
        <span slot="subtitle">Subtitle</span>
    </wcs-alert>
`;

export const Default: StoryObj<AlertArgs> = {
    render: (args: AlertArgs, context) => Template(args, context),
    args: {
        intent: 'success',
        show: true,
        showProgressBar: false,
        timeout: 0
    }
};

export const WithTimeout: StoryObj<AlertArgs> = {
    render: (args: AlertArgs, context) => Template(args, context),
    args: {
        intent: 'success',
        show: true,
        showProgressBar: false,
        timeout: 5000
    }
};

export const WithProgressBar: StoryObj<AlertArgs> = {
    render: (args: AlertArgs, context) => Template(args, context),
    args: {
        intent: 'success',
        show: true,
        showProgressBar: true,
        timeout: 5000
    }
};
