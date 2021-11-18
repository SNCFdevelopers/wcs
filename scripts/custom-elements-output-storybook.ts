import { JsonDocs } from '@stencil/core/internal';
import * as fs from 'fs';

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
