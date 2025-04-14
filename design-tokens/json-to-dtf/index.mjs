import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from "style-dictionary";
import { sortByName } from "style-dictionary/utils";
import fs from 'fs/promises';

/**
 * =============================================
 * JSON-TO-DTF SCRIPT, PLEASE REFER TO README.MD
 * =============================================
 */

register(StyleDictionary);

// Custom Format
StyleDictionary.registerFormat({
    name: 'custom/w3c-design-token-format',
    format: function ({ dictionary, file }) {

        const output = {};

        /**
         * Converts the token type into dimension (except for line-height and motion tokens)
         */
        function computeType(token) {
            // Transform weight tokens type
            // FIGMA : weight.100.$type = 'content'
            // WCS : weight.100.$type = 'number'
            if (token.path.includes('weight')) {
                return 'number';
            }

            return token.type;
        }

        /**
         * Compute the value of the token, strip unnecessary 'sncf-*' parts
         */
        function computeValue(token) {
            let value = token.original.value.toString().replace(/\.sncf-[\w-]+/g, '') // remove useless sncf-* subgroups

            // Transform weight tokens value
            // FIGMA : weight.100.$value = 'Light'
            // WCS : weight.100.$value = '100'
            if (token.path.includes('weight')) {
                switch (value) {
                    case 'Light':
                        return "100";
                    case 'Book':
                        return "300";
                    case 'Roman':
                        return "400";
                    case 'Medium':
                        return "500";
                    case 'Heavy':
                        return "800";
                    case 'Black':
                        return "900";
                    default:
                        return value;
                }
            }

            return value;
        }


        // Sort all tokens by keys and apply compute-functions to convert Token Studio → WCS
        dictionary.allTokens.sort(sortByName).forEach(token => {
            const path = token.path; // e.g., ['primitive', 'breakpoints', 'desktop']
            const theme = path.toString().match(/sncf-\w+/g) ? path.toString().match(/sncf-\w+/g)[0] : null; // e.g. 'sncf-holding'

            // Remove the theme from the path if it exists (color.sncf-holding.parme → color.parme)
            if (path.includes('color') && theme) {
                path.splice(path.indexOf(theme), 1);
            }

            const type = computeType(token);
            const value = computeValue(token);

            const content = {
                $type: type,
                $value: value,
            };

            if (token.description) {
                content.$description = token.description;
            }

            // Navigate through the output object to the correct depth
            let current = output;
            path.forEach((key, index) => {
                if (!current[key]) {
                    current[key] = {};
                }
                if (index === path.length - 1) {
                    current[key] = content;
                } else {
                    current = current[key];
                }
            });
        });


        // Sort alphabetically the keys of the output object for primitive color
        output.primitive.color = Object.fromEntries(Object.entries(output.primitive.color).sort());

        return JSON.stringify(file.destination?.includes('primitive') ? { primitive : output.primitive} : { semantic : output.semantic }, null ,4);
    }
});

/**
 * Register a Style Dictionary filter to :
 * - Exclude Figma tokens → figma-only tokens should not appear in the final file for font tokens like line-height
 * - Ungroup primitives → figma primitives as sorted in folder e.g. "sncf-holding.parme", "sncf-reseau.bleu-acier". The tokens in the wrong theme are excluded here.
 */
StyleDictionary.registerFilter({
    name: 'excludeFigmaTokensAndUngroupPrimitives',
    filter: function(token, config) {
        const tokenName = token.name.toLowerCase();
        const tokenPath = token.path.join('.').toLowerCase();
        const tokenValue = typeof token.value === 'string' ? token.value.toLowerCase() : '';
        const sourceName = config.source.find(source => source.includes('primitive'))

        const isNotAFigmaOnlyToken = !tokenName.includes('figma') && !tokenPath.includes('figma') && !tokenValue.includes('figma');
        const isTheRightTheme = tokenPath.match(/color.sncf-\w+/g) ? tokenPath.includes(sourceName.match(/sncf-\w+/g)[0]) : true;

        return isNotAFigmaOnlyToken && isTheRightTheme;
    }
});

/**
 * The code belows takes all the JSON files in the input folder and exports all to the output folder with Style Dictionary
 */

const inputFolder = 'design-tokens/json-to-dtf/input';
const outputFolder = 'design-tokens/json-to-dtf/output';

const files = (await fs.readdir(inputFolder)).filter(file => file.endsWith('.json'));
const themeGroups = {};

files.forEach(file => {
    const match = file.match(/(sncf-[\w]+)-(primitive|semantic)\.json/);
    if (match) {
        const [ , theme, type ] = match;
        if (!themeGroups[theme]) {
            themeGroups[theme] = {};
        }
        themeGroups[theme][type] = `${inputFolder}/${file}`;
    }
});

// Loop over each theme and build its Style Dictionary
for (const [theme, types] of Object.entries(themeGroups)) {
    const sources = [];
    const files = [];

    if (types.primitive) {
        sources.push(types.primitive);
        files.push({
            destination: `${theme}-primitive-output.json`,
            format: 'custom/w3c-design-token-format',
            filter: 'excludeFigmaTokensAndUngroupPrimitives'
        });
    }

    if (types.semantic) {
        sources.push(types.semantic);
        files.push({
            destination: `${theme}-semantic-output.json`,
            format: 'custom/w3c-design-token-format',
            filter: 'excludeFigmaTokensAndUngroupPrimitives'
        });
    }

    const sd =  new StyleDictionary({
        log: {
            verbosity: 'verbose'
        },
        source: sources,
        preprocessors: ['tokens-studio'],
        platforms: {
            json: {
                transformGroup: 'tokens-studio',
                buildPath: `${outputFolder}/`,
                files: files,
                options: {
                    outputReferences: true
                }
            }
        }
    });

    await sd.buildAllPlatforms();
}
