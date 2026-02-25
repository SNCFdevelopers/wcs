import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

// @ts-ignore
import path from 'path';
// @ts-ignore
import glob from 'glob';

export const config: Config = {
    namespace: 'wcs',
    nodeResolve: {
        browser: true
    },
    devServer: {
        port: 3333,
        reloadStrategy: "pageReload"
    },
    testing: {
        rootDir: './src',
        testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']

    },
    globalStyle: 'src/style/global.scss',
    plugins: [
        sass({
            // Allows to write @import '@material/*' from scss
            // Importing all node_modules stylesheet
            includePaths: [path.join(__dirname, 'node_modules')]
        })
    ],
    outputTargets: [
        angularOutputTarget({
            componentCorePackage: 'wcs-core',
            directivesProxyFile: './angular/projects/wcs-angular/src/lib/proxies.ts',
            outputType: 'component'
        }),
        {
            type: 'dist',
            esmLoaderPath: '../loader'
        },
        {
            type: 'dist-custom-elements',
            customElementsExportBehavior: 'bundle',
            externalRuntime: false,
            minify: true,
            dir: 'bundle',
            includeGlobalScripts: true,

            // Add files for dev experience purposes (IDE auto-completion, types checking, ...)
            copy: [{
                src: '../publishing/bundle',
                dest: 'bundle',
                warn: true
            }]
        },
        {
            type: 'dist-custom-elements',
            customElementsExportBehavior: 'auto-define-custom-elements',
            externalRuntime: false,
            minify: true,
            dir: 'composite-elements',
            includeGlobalScripts: true,

            // Add files for dev experience purposes (IDE auto-completion, types checking, ...)
            copy: [{
                src: '../publishing/composite-elements',
                dest: 'composite-elements',
                warn: true
            }]
        },
        {
            type: 'docs-readme'
        },
        {
            type: 'docs-json',
            file: './stories/documentation/generated/docs.json'
        },
        reactOutputTarget({
            componentCorePackage: 'wcs-core',
            proxiesFile: './react/lib/components/stencil-generated/index.ts'
        }),
        {
            type: 'www',
            serviceWorker: null,
            copy: [
                {
                    src: '../design-tokens/dist',
                    dest: 'design-tokens'
                },
                {
                    src: './assets',
                    dest: 'assets',
                },
                {
                    src: './utils/playwright/test.css',
                    dest: 'test.css',
                },
                {
                    src: './utils/playwright/icons/**',
                    dest: 'assets/fonts/icons',
                }
            ],
        }
    ]
};
