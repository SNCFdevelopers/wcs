import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { MaterialIconFamily, MaterialIconSize } from '../../../src/components/mat-icon/mat-icon-interface';
// @ts-ignore
import matIconDocumentation from './mat-icon-documentation.md';

export default {
    title: 'Components/Mat icon',
    component: 'wcs-mat-icon',
    parameters: {
        docs: {
            description: {
                component: matIconDocumentation
            }
        }
    },
} as Meta;

const Template: Story<Partial<{ size: MaterialIconSize, icon: string, family: MaterialIconFamily }>> = (args) => html`
    <wcs-mat-icon size=${args.size}
                  icon=${args.icon}
                  family=${args.family}>
    </wcs-mat-icon>
`;

export const Default = Template.bind({});
Default.args = {
    size: 's',
    icon: 'settings_applications',
    family: 'filled'
};

export const SizeMDefaultFamily = Template.bind({});
SizeMDefaultFamily.args = {
    size: 'm',
    icon: 'settings_applications',
    family: 'filled'
};

export const SizeLDefaultFamily = Template.bind({});
SizeLDefaultFamily.args = {
    size: 'l',
    icon: 'settings_applications',
    family: 'filled'
};

export const SizeXLDefaultFamily = Template.bind({});
SizeXLDefaultFamily.args = {
    size: 'xl',
    icon: 'settings_applications',
    family: 'filled'
};

export const SizeLOutlinedFamily = Template.bind({});
SizeLOutlinedFamily.args = {
    size: 'l',
    icon: 'settings_applications',
    family: 'outlined'
};

export const SizeLRoundedFamily = Template.bind({});
SizeLRoundedFamily.args = {
    size: 'l',
    icon: 'settings_applications',
    family: 'rounded'
};

export const SizeLSharpFamily = Template.bind({});
SizeLSharpFamily.args = {
    size: 'l',
    icon: 'settings_applications',
    family: 'sharp'
};

export const SizeLTwotoneFamily = Template.bind({});
SizeLTwotoneFamily.args = {
    size: 'l',
    icon: 'settings_applications',
    family: 'twotone'
};
