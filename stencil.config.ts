import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

import path from 'path';
import glob from 'glob';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
    namespace: 'wcs',
    nodeResolve: {
        browser: true
    },
    testing: {
        rootDir: './src',
        testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
        browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    globalStyle: 'src/style/global.scss',
    plugins: [
        sass({
            // Allows to write @import '@material/*' from scss
            // Typings are wrong so we have to add as any
            // TODO: make it so we don't have to type full path for /style folder too.
            includePaths: glob.sync(
                path.join(__dirname, '**/node_modules/@material')
            ).map((dir) => path.dirname(dir))
        } as any)
    ],
    outputTargets: [
        angularOutputTarget({
            componentCorePackage: 'wcs-core',
            directivesProxyFile: './angular/projects/wcs-angular/src/lib/proxies.ts'
        }),
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'docs-readme'
        }
    ]
};
