// @ts-ignore
import docsJson from '../documentation/generated/docs.json';
import { ArgTypes } from '@storybook/types';
import { JsonDocs, JsonDocsProp, JsonDocsMethod } from '../documentation/generated/docs';

const hasOptions = prop => prop?.type.includes(' | ')
const isFunction = prop => prop?.type.includes('=>') || prop?.type.includes('func')
const optionsLength = prop => hasOptions(prop) ? prop.values?.length : 0;

/**
 * Returns a mapped control for a given component property
 *
 * @returns ArgType ControlType for a given component prop
 * @param prop Property of a component (e.g. "size" for wcs-button)
 */
const getControl = (prop): { type?: string, [opts: string]: any } => {
    switch (prop.type) {
        case 'boolean':
        case 'boolean | undefined':
            return {type: 'boolean'}

        case 'string | string[] | undefined':
        case 'any[] | undefined':
        case 'number[]':
        case 'any[]':
            return {type: 'array'}

        case 'string':
        case 'string | undefined':
        case 'null | string | undefined':
        case 'number | string | undefined':
            return {type: 'text'}

        case 'number':
        case 'number | undefined':
        case 'null | number | undefined':
            return {type: 'number', min: 0}

        default:
            if (isFunction(prop)) {
                return {disable: true}
            }
            if (hasOptions(prop)) {
                if (optionsLength(prop) > 2)
                    return {type: 'select'}
                return {type: 'radio'}
            }
            return {type: 'text'}
    }
}

/**
 * Returns a mapped set of ArgTypes for a given component tag.
 * Contains props, attributes and methods to be displayed in the Storybook control table.
 *
 * @returns Mapped ArgTypes corresponding to the chosen component
 * @param tag Tag of the component (e.g. "wcs-button")
 */
export const getComponentArgs = (tag: string): Partial<ArgTypes> => {
    const components = (docsJson as JsonDocs).components;
    const matchingComponent = components.filter(component => component.tag === tag)[0];

    if (!matchingComponent) return;

    const props = matchingComponent.props as JsonDocsProp[];
    const propList = {};
    props.forEach(prop => {
        const options = prop.values ? prop.values.map(option => option.value) : null;
        const control = getControl(prop);
        // Map Properties
        propList[prop.name] = {
            description: prop.docs,
            table: {
                category: 'properties',
                type: {
                    summary: prop.optional ? `${prop.type} | undefined` : prop.type
                },
                defaultValue: {
                    summary: prop.default
                }
            },
            options,
            control,
        }
        // Disable controls for attributes
        if(prop.attr) {
            prop.attr && (propList[prop.attr + ' '] = {
                control: {disable: true}
            });
        }
    });

    const methods = matchingComponent.methods as JsonDocsMethod[];
    const mappedMethods = {};

    methods.forEach(method => {
        mappedMethods[method.name] = {
            table: { category: 'methods' },
            description: method.docs,
            type: { summary: method.signature },
            control: { disable: true },
            defaultValue: { summary: null }
        }
    });

    return {
        ...propList,
        ...mappedMethods,
    }
}
