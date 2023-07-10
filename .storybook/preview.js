import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';

// XXX: https://github.com/storybookjs/storybook/issues/15436#issuecomment-1272769983
// Migrate for a stable solution when storybook add support for hiding private field from custom element manifest
export const setCustomElementsManifestWithOptions = (customElements, options,) => {
    let {privateFields = true} = options;
    if (!privateFields) {
        customElements?.modules?.forEach((module) => {
            module?.declarations?.forEach(declaration => {
                setCustomElementsManifestAttributes(declaration);
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

// XXX : https://github.com/storybookjs/storybook/issues/18858
// Since SB 7.0.21, attributes overrides and takes over members in the custom elements manifest.
// Problem : they do not contain a description by default. Here's the workaround :
export const setCustomElementsManifestAttributes = (declaration) => {
    declaration.attributes?.forEach((attribute) => {
        const memberName = declaration.members?.find((member) => !member.privacy?.includes('private') && member.name === attribute.fieldName);
        if (memberName && memberName.description) {
            attribute.description = `HTML attribute for property \`${memberName.name}\``;
            attribute.type = memberName.type;
        }
        attribute.name += ' '; // Add an empty space to dissociate attribute from properties and display it twice
    });
}

setCustomElementsManifestWithOptions(customElements, {privateFields: false});

export const parameters = {
    actions: {argTypesRegex: "^on[A-Z].*"},
    options: {
        storySort: {
            order: ['Documentation', 'Components'],
        },
    },
    controls: {
        expanded: true,
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
