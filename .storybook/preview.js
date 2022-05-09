import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    options: {
        storySort: {
            order: ['Documentation', 'Components'],
        },
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
