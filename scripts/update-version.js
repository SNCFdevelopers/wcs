const {exec} = require("child_process");
const execSync = require('child_process').execSync;
const fs = require('fs');


/**
 * return null if no version are specifies in arguments
 */
function getVersionParam() {
    let versionParam = null;
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == "--version") {
            versionParam = process.argv[i + 1];
        }
    }
    return versionParam;
}

function updateDependencyFor(packageFilePath, dependencyName, newVersion, isPeerDependency) {
    const fileContent = fs.readFileSync(packageFilePath);
    const packageContent = JSON.parse(fileContent);
    packageContent[isPeerDependency ? 'peerDependencies' : 'dependencies'][dependencyName] = newVersion;
    fs.writeFileSync(packageFilePath, JSON.stringify(packageContent, null, 2));
}

/**
 * Update a single package
 * @param path path to the package to update
 * @param newVersion new version number
 * @param commit true if the command should commit and tag on git
 */
function updatePackage(path, newVersion, commit) {
    let args = '';
    if (!commit) {
        args = '--no-git-tag-version ';
    }
    console.log(`[exec command] npm version ${args}${newVersion}`);
    console.log(execSync(`npm version ${args}${newVersion}`, {
        cwd: path
    }).toString());
}

function commitAndTag(version) {
    const commandToExec = `git add . && git commit -m "release ${version}" && git tag -a ${version} -m ${version} && git push --follow-tags`;
    console.log(`[EXEC] ${commandToExec}`);
    console.log(execSync(commandToExec, {
        cwd: './'
    }).toString());
}

/**
 * Update the version of all packages in the project
 * @param newVersion new version number
 */
function updateAllPackages(newVersion) {
    // Update wcs-angular package
    updatePackage('./angular/projects/wcs-angular', newVersion, false);
    updateDependencyFor('./angular/projects/wcs-angular/package.json', 'wcs-core', newVersion, true);

    // Update wcs-formly package
    updatePackage('./angular/projects/wcs-formly', newVersion, false);
    updateDependencyFor('./angular/projects/wcs-formly/package.json', 'wcs-core', newVersion, true);
    updateDependencyFor('./angular/projects/wcs-formly/package.json', 'wcs-angular', newVersion, true);

    // Update wcs-react package
    updatePackage('./react', newVersion, false);
    updateDependencyFor('./react/package.json', 'wcs-core', newVersion, false);

    // Update wcs-core package
    updatePackage('./', newVersion, false);

    commitAndTag(newVersion);
}

function main() {
    const versionParam = getVersionParam();
    if (versionParam) {
        updateAllPackages(versionParam);
    } else {
        throw 'You must specifie the version param';
    }
}

main();
