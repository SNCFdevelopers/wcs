import { Rule, Tree, SchematicContext, SchematicsException, url, apply, move, chain, mergeWith } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getWorkspace } from '@schematics/angular/utility/config';
import chalk from 'chalk';
import {
    getProjectFromWorkspace,
    getProjectMainFile,
    getProjectStyleFile
} from '@angular/cdk/schematics';
import { version as wcsVersion } from '../../../package.json';
// tslint:disable: no-console

const POLYFILLS_STRING =
    `\napplyPolyfills().then(() => {
    defineCustomElements(window);
});\n`;

const MODULE_IMPORTS = `import { applyPolyfills, defineCustomElements } from 'wcs-temporary/loader';\n`;

export function ngAdd(_options: any): Rule {
    return (tree: Tree, context: SchematicContext): Rule => {
        addPackageToPackageJson(tree, 'wcs-temporary', wcsVersion);
        importStyles(tree);
        defineCustomElements(tree);
        addCustomElementsSchema(tree);
        const copyAssets = apply(url('./files'), [
            move('src/assets')
        ]);
        context.addTask(new NodePackageInstallTask());

        return chain([
            mergeWith(copyAssets)
        ]);
    };
}

function addCustomElementsSchema(tree: Tree) {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));
    const appModule = tree.read(appModulePath);
    if (!appModule) {
        throw new SchematicsException(`Could not find app module (${appModulePath})`);
    }
    const appModuleFile = appModule.toString();
    const bootstrapLine = `bootstrap: [AppComponent]`;
    const insertIndex = appModuleFile.indexOf(bootstrapLine) + bootstrapLine.length;
    const importLine = `import { NgModule`;
    const importInsertIndex = appModuleFile.indexOf(importLine) + importLine.length;
    const updates = tree.beginUpdate(appModulePath)
        .insertRight(insertIndex, `,\n  schemas: [CUSTOM_ELEMENTS_SCHEMA]`)
        .insertRight(importInsertIndex, `, CUSTOM_ELEMENTS_SCHEMA`);
    tree.commitUpdate(updates);
}

function defineCustomElements(tree: Tree) {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const mainFilePath = getProjectMainFile(project);
    const main = tree.read(mainFilePath);
    if (!main) {
        // TODO: log error + how to fix it instead.
        throw new SchematicsException(`Could not find main file at (${mainFilePath})`);
    }
    const mainUpdate = tree.beginUpdate(mainFilePath)
        .insertLeft(0, MODULE_IMPORTS)
        .insertRight(main.toString().length, POLYFILLS_STRING);
    tree.commitUpdate(mainUpdate);
}

function importStyles(tree: Tree) {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
        console.warn(chalk.red(`Could not find the default style file for this project.`));
        console.warn(chalk.red(`Please consider manually setting up the Roboto font in your CSS.`));
        return;
    }

    const buffer = tree.read(styleFilePath);

    if (!buffer) {
        console.warn(chalk.red(`Could not read the default style file within the project ` +
            `(${chalk.italic(styleFilePath)})`));
        console.warn(chalk.red(`Please consider manually setting up the Robot font.`));
        return;
    }

    const styleFile = buffer.toString();
    const insertion = `@import '~wcs-temporary/dist/wcs/wcs.css;\n`;

    if (styleFile.includes(insertion)) {
        return;
    }

    const recorder = tree.beginUpdate(styleFilePath);

    recorder.insertLeft(styleFile.length, insertion);
    tree.commitUpdate(recorder);
}

/** Adds a package to the package.json in the given host tree. */
function addPackageToPackageJson(host: Tree, pkg: string, version: string): Tree {
    const packageJson = host.read('package.json');
    if (packageJson) {
        const sourceText = packageJson.toString('utf-8');
        const json = JSON.parse(sourceText);

        if (!json.dependencies) {
            json.dependencies = {};
        }

        if (!json.dependencies[pkg]) {
            json.dependencies[pkg] = version;
            json.dependencies = sortObjectByKeys(json.dependencies);
        }

        host.overwrite('package.json', JSON.stringify(json, null, 2));
    }

    return host;
}

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: any): any {
    return Object.keys(obj)
        .sort()
        .reduce((result: any, key) => (result[key] = obj[key]) && result, {});
}

export default ngAdd;
