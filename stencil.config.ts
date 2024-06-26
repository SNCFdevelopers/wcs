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
            includePaths: [path.join(__dirname, 'node_modules')],
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
            esmLoaderPath: '../loader',
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
            proxiesFile: './react/lib/components/stencil-generated/index.ts',
        })
    ]
};
