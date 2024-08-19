import StyleDictionary from "style-dictionary";

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
                        selector: `.token-migration.${tokensConfig.theme}`, // TODO: remove it when finish migration
                        outputReferences: true
                    },
                }]
            }
        }
    });
    await styleDictionnary.buildPlatform('css');
}
