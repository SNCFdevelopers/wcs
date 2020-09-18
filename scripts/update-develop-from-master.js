const execSync = require('child_process').execSync;
function main() {
    const commandToExec = `git checkout develop && git pull && git merge master && git push`;
    console.log(`[EXEC] ${commandToExec}`);
    console.log(execSync(commandToExec, {
        cwd: './'
    }).toString());
}

main();
