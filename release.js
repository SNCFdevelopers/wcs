const { exec } = require("child_process");

function updateVersionForPackage(packagePath, newVersion) {
    exec(`npm version ${newVersion}`, {
        cwd: packagePath
    }, function(error, stdout, stderr) {
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

function updateVersions(newVersion) {
    updateVersionForPackage('./', newVersion);
    updateVersionForPackage('./angular/projects/wcs-angular/', newVersion);
    updateVersionForPackage('./angular/projects/wcs-formly/', newVersion);
}

/**
 * return null if no filter are specifies in arguments
 */
function getVersionIfPresent() {
    let version = null;
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == "--version") {
            version = process.argv[i + 1];
        }
    }
    return version;
}

const newVersion = getVersionIfPresent();
if (newVersion) {
    updateVersions(newVersion);
} else {
    throw 'You must specify version param'
}
