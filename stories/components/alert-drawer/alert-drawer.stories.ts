import { Meta, StoryFn, StoryObj } from "@storybook/web-components-vite";
import { withActions } from "storybook/actions/decorator";
import { getComponentArgs } from "../../utils/args-generation";
import { html } from "lit-html";
import { WcsAlertIntent, WcsAlertConfig } from '../../../src/components/alert/alert-interface';
import { WcsAlertDrawerPosition } from "../../../src/components/alert-drawer/alert-drawer-interface";
import AlertDrawerDocumentation from "./alert-drawer-documentation.md?raw";
const meta: Meta = {
    title: 'Components/AlertDrawer',
    component: 'wcs-alert-drawer',
    decorators: [withActions],
    parameters: {
        docs: {
            description: {
                component: AlertDrawerDocumentation
            }
        },
        actions: {
            handles: [
                'wcsAlertDismiss',
            ]
        }
    },
    argTypes: getComponentArgs('wcs-alert-drawer')
}
export default meta;

let alertId = 1;

const addAlert = (wcsAlertIntent: WcsAlertIntent, showProgressBar: boolean, timeout: number) => {
    const alertDrawer = document.getElementById("wcs-alert-drawer");
    if (!alertDrawer) {
        return;
    }

    alertDrawer?.show({
        title: `Title ${alertId}`,
        subtitle: 'Subtitle',
        intent: wcsAlertIntent,
        showProgressBar: showProgressBar,
        timeout: timeout,
    } as WcsAlertConfig);

    alertId++;
    if (alertId > Number.MAX_SAFE_INTEGER) {
        alertId = 0;
    }
};

type AlertDrawerArgs = {
    position: WcsAlertDrawerPosition,
    showProgressBar: boolean,
    timeout: number,
}

const Template: StoryFn<AlertDrawerArgs> = (args) => html`
    <p>💡Use attributes in the panel below to play with <b>wcs-alert-drawer</b> and <b>wcs-alert</b></p>

    <wcs-button @click="${() => addAlert('success', args.showProgressBar, args.timeout)}" class="wcs-success">Toggle
        success alert
    </wcs-button>
    <wcs-button @click="${() => addAlert('information', args.showProgressBar, args.timeout)}" class="wcs-info">Toggle
        information alert
    </wcs-button>
    <wcs-button @click="${() => addAlert('warning', args.showProgressBar, args.timeout)}" class="wcs-warning">Toggle
        warning alert
    </wcs-button>
    <wcs-button @click="${() => addAlert('error', args.showProgressBar, args.timeout)}" class="wcs-critical">Toggle
        error alert
    </wcs-button>

    <wcs-alert-drawer position=${args.position} id="wcs-alert-drawer"></wcs-alert-drawer>
`

export const Default: StoryObj<AlertDrawerArgs> = {
    render: (args: AlertDrawerArgs, context) => Template(args, context),
    args: {
        position: 'bottom-right',
        timeout: 5000,
        showProgressBar: true,
    }
};
