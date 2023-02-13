import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import listItemDocumentation from './list-item-documentation.md'

const meta: Meta = {
    title: 'Components/List-item',
    component: 'wcs-list-item',
    parameters: {
        docs: {
            description: {
                component: listItemDocumentation
            }
        }
    },
    subcomponents: {
        'WcsListItemProperties': 'wcs-list-item-properties',
        'WcsListItemProperty': 'wcs-list-item-property'
    }
};
export default meta;

const Template: StoryFn<Partial<{ activated: boolean }>> = (args) => html`
    <wcs-list-item ?activated=${args.activated}>
        <wcs-mat-icon slot="icon" icon="description"></wcs-mat-icon>
        <div slot="title">Titre premier item</div>
        <div slot="actions">
            <wcs-button shape="square" mode="stroked" class="wcs-secondary">
                <i class="material-icons">open_in_new</i>
            </wcs-button>
        </div>
        <wcs-list-item-properties>
            <wcs-list-item-property>Mise à jour le 4 avril 2017</wcs-list-item-property>
            <wcs-list-item-property>Entité : SNCF</wcs-list-item-property>
            <wcs-list-item-property>Agent : Marcel Patoulatchi</wcs-list-item-property>
        </wcs-list-item-properties>
        <div slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet libero
            scelerisque lacus feugiat, in elementum nisi mollis. Duis nulla ipsum, aliquet eu sapien nec, maximus
            finibus enim. Nullam quis dui hendrerit, semper quam ut, faucibus felis. Cras auctor lobortis tellus, vel
            volutpat quam ultrices vitae. Sed rhoncus volutpat venenatis. Etiam sed molestie magna. Vivamus congue odio
            et elit pellentesque, a dictum risus bibendum. Phasellus gravida auctor mattis.
        </div>
    </wcs-list-item>
    <wcs-list-item>
        <wcs-mat-icon slot="icon" icon="description"></wcs-mat-icon>
        <div slot="title">Titre deuxième item</div>
        <div slot="actions">
            <wcs-button shape="square" mode="stroked" class="wcs-secondary">
                <i class="material-icons">create</i>
            </wcs-button>
        </div>
        <wcs-list-item-properties>
            <wcs-list-item-property>Première propriété</wcs-list-item-property>
            <wcs-list-item-property>Deuxième propriété</wcs-list-item-property>
            <wcs-list-item-property>Troisième propriété</wcs-list-item-property>
        </wcs-list-item-properties>
        <div slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet libero
            scelerisque lacus feugiat, in elementum nisi mollis. Duis nulla ipsum, aliquet eu sapien nec, maximus
            finibus enim. Nullam quis dui hendrerit, semper quam ut, faucibus felis. Cras auctor lobortis tellus, vel
            volutpat quam ultrices vitae. Sed rhoncus volutpat venenatis. Etiam sed molestie magna. Vivamus congue odio
            et elit pellentesque, a dictum risus bibendum. Phasellus gravida auctor mattis.
        </div>
    </wcs-list-item>
`;

export const Default = Template.bind({});
Default.args = {
    activated: false
};
