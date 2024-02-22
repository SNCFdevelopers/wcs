import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Tabs/Subcomponents/Tab',
    component: 'wcs-tab',
    argTypes: getComponentArgs('wcs-tab'),
};

export default meta;

interface TabStoryArgs {
    header: string,
    itemKey: string
}

const Template: StoryFn<Partial<TabStoryArgs>> = (args) => html`
    <wcs-tab header=${args.header} item-key=${args.itemKey}>
        ${args.header} content
    </wcs-tab>
`;

/**
 * `wcs-tab` has to be child of `wcs-tabs` component
 */
export const Default: StoryObj<TabStoryArgs> = {
    render: (args: TabStoryArgs) => Template(args, this),
    args: {
        header: 'Tab',
        itemKey: 'tab'
    }
};
