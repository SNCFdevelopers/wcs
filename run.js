const concurrently = require('concurrently');

const args = process.argv.slice(2).join(' ');

concurrently(
    [
        { command: 'stencil build --dev --serve --watch', prefixColor: 'blue', name: 'stencil build' },
        { command: 'node build.js --watch -- ' + args, prefixColor: 'magenta', name: 'doc' }
    ],
    {
        killOthers: ['failure', 'success']
    }
)
