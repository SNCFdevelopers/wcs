import { JsonDocs } from '@stencil/core/internal';
import * as fs from 'fs';

// This method was used to generate the custom-elements.json in an earlier version of the specification.
//
// It is no longer used, replaced by: https://github.com/open-wc/custom-elements-manifest/tree/master/packages/analyzer
//
// We keep the file because the specification is not yet stable and Stencil does not yet provide any implementation for
// this feature.
//
// This script had the advantage of being based on an internal Stencil class (JsonDocs), which provides more assurance
// than the external tool currently used.


// https://github.com/ionic-team/stencil/pull/2354
export async function generateCustomElementsJson(docsData: JsonDocs) {
    const jsonData = {
        version: 1.2,
        tags: docsData.components.map((component) => ({
            name: component.tag,
            path: component.filePath,
            description: component.docs,

            attributes: component.props
                .filter((prop) => prop.attr)
                .map((prop) => ({
                    name: prop.attr,
                    type: prop.type,
                    description: prop.docs,
                    defaultValue: prop.default,
                    required: prop.required,
                })),

            properties: component.props.map((prop) => ({
                name: prop.name,
                type: prop.type,
                description: prop.docs,
                defaultValue: prop.default,
                required: prop.required,
            })),

            events: component.events.map((event) => ({
                name: event.event,
                description: event.docs,
            })),

            methods: component.methods.map((method) => ({
                name: method.name,
                description: method.docs,
                signature: method.signature,
            })),

            slots: component.slots.map((slot) => ({
                name: slot.name,
                description: slot.docs,
            })),

            cssProperties: component.styles
                .filter((style) => style.annotation === 'prop')
                .map((style) => ({
                    name: style.name,
                    description: style.docs,
                })),

            cssParts: component.parts.map((part) => ({
                name: part.name,
                description: part.docs,
            })),
        })),
    };

    fs.writeFileSync('./custom-elements.json', JSON.stringify(jsonData, null, 2));
}
