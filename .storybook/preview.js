import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';

// XXX: https://github.com/storybookjs/storybook/issues/15436#issuecomment-1272769983
// Migrate for a stable solution when storybook add support for hiding private field from custom element manifest
export const setCustomElementsManifestWithOptions = (customElements, options,) => {
    let {privateFields = true} = options;
    if (!privateFields) {
        customElements?.modules?.forEach((module) => {
            module?.declarations?.forEach(declaration => {
                Object.keys(declaration).forEach(key => {
                    if (Array.isArray(declaration[key])) {
                        declaration[key] = declaration[key].filter(
                            (member) =>
                                !member.privacy?.includes('private'),
                        );
                    }
                });
            });
        });
    }
    return setCustomElementsManifest(customElements);
};

setCustomElementsManifestWithOptions(customElements, {privateFields: false});

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
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'light',
                value: '#ffffff',
            },
            {
                name: 'dark',
                value: '#1b1c1d',
            },
        ],
    },
}
