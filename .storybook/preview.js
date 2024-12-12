import {setCustomElementsManifest} from '@storybook/web-components';
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

export const globalTypes = {
    designTokenMode: {
        name: 'Design Tokens',
        description: 'Preview mode to use design tokens',
        defaultValue: 'sncf-holding',
        toolbar: {
            title: 'Activate design tokens',
            icon: 'eye',
            items: [
                {value: null, title: 'Off'},
                {value: 'sncf-holding', title: 'Sncf Holding new theme'},
                {value: 'sncf-voyageurs', title: 'Sncf Voyageurs'},
                {value: 'sncf-reseau', title: 'Sncf Reseau'}
            ],
        },

    }
}

const withDesignTokens = (StoryFn, context) => {
    const {designTokenMode} = context.globals;

    const appliedMode = Array.from(document.body.classList.values()).filter(value => value.startsWith("sncf"));
    appliedMode.forEach(mode => document.body.classList.remove(mode));

    const wcsElements = Array.from(document.querySelectorAll('*')).filter(el => el.tagName.toLowerCase().startsWith('wcs-'));

    if (!designTokenMode) {
        document.body.classList.remove('token-migration');

        wcsElements.forEach(el => {
            applyFunctionToWcsElement(el, (el) => el.classList.remove('token-migration'));
        });
    } else {
        document.body.classList.add('token-migration');

        document.body.classList.add(designTokenMode);
        wcsElements.forEach(el => {
            applyFunctionToWcsElement(el, (el) => el.classList.add('token-migration'));
        });
    }

    return StoryFn();
}

/**
 * Apply function on element if it's a wcs elements
 * We explore all the children of base element to check if a child element is also a wcs-element to apply the function
 *
 * @param {HTMLElement} element must be a HTMLElement
 * @param {function} fn must be a function
 */
function applyFunctionToWcsElement(element, fn, stack=0) {
    if(stack === 0 && !element?.tagName?.startsWith('WCS')) {
        throw new TypeError("Root element must be a wcs element");
    }
    if (!element || !(element instanceof HTMLElement)) return;

    if (element.tagName.startsWith('WCS')) {
        if (typeof fn !== 'function' || fn.length !== 1) {
            throw new TypeError("The function is not applicable to the wcs element or one of it's wcs children");
        }
        fn(element)
    }

    if (element.shadowRoot) {
        for (let child of element.children) { // slotted elements
            applyFunctionToWcsElement(child, fn, ++stack);
        }
        for (let child of element.shadowRoot.children) {
            applyFunctionToWcsElement(child, fn, ++stack);
        }
    } else if (element.hasChildNodes()) {
        for (let child of element.children) {
            applyFunctionToWcsElement(child, fn, ++stack);
        }
    }
}

export const decorators = [withDesignTokens];
