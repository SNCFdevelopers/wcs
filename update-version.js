const {exec} = require("child_process");

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
    exec(`npm version ${args}${newVersion}`, {
        cwd: path
    }, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

/**
 * Update the version of all packages in the project
 * @param newVersion new version number
 */
function updateAllPackages(newVersion) {
    updatePackage('./angular/projects/wcs-angular', newVersion, false);
    updatePackage('./', newVersion, true);
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
