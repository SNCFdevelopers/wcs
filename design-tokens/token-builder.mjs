import StyleDictionary from "style-dictionary";
import { ROOT_SCOPED_FILE_NAME_SUFFIX } from './index.mjs';

const styleDictionnaryConfig = {
    log: {
        verbosity: "verbose"
    }
}

export async function buildVariables(buildConfig, tokensConfig) {
    if (!tokensConfig.theme) {
        throw new Error(`No theme provided to build variables`);
    }
    if (!tokensConfig.jsonFiles || tokensConfig.jsonFiles.length === 0) {
        throw new Error(`No json files provided for mode '${tokensConfig.theme}' to build variables`);
    }
    if(!tokensConfig.selector) {
        throw new Error(`No selector provided for mode '${tokensConfig.theme}' to build variables`);
    }

    const jsonFilesSource = tokensConfig.jsonFiles.map(jsonFile => `${buildConfig.inputDirectory}/${jsonFile}`);
    let styleDictionnary = new StyleDictionary(styleDictionnaryConfig);
    styleDictionnary = await styleDictionnary.extend({
        include: jsonFilesSource,
        platforms: {
            css: {
                buildPath: `${buildConfig.outputDirectory}/`,
                transformGroup: 'css',
                prefix: 'wcs',
                files: [{
                    destination: `${tokensConfig.theme}.css`,
                    format: "css/variables",
                    options: {
                        selector: tokensConfig.selector,
                        outputReferences: true
                    },
                },
                    {
                        destination: `${tokensConfig.theme}${ROOT_SCOPED_FILE_NAME_SUFFIX}.css`,
                        format: "css/variables",
                        options: {
                            selector: ':root',
                            outputReferences: true
                        },
                    }]
            },
            jsonResolved: {
                buildPath: `${buildConfig.outputDirectory}/`,
                prefix: 'wcs',
                transformGroup: 'web',
                files: [{
                    destination: `${tokensConfig.theme}.json`,
                    format: "json",
                    options: {
                    },
                }]
            }
        }
    });
    await styleDictionnary.buildAllPlatforms();
}
