#!/usr/bin/env node
/**
 * Verify that the CSS references var(--token) in the components
 * match already defined design tokens / css variables.
 *
 * Usage:
 *   node audit-tokens.js --tokens ./tokens.css --src ./src [--out ./report.md]
 *
 * --tokens : css file(s) containing the design tokens (can be multiple)
 * --src    : root folder of the components to scan (.ts, .tsx, .scss, .css, .html)
 * --out    : (optional) also writes a markdown report
 */

const fs = require('fs');
const path = require('path');

function parseArgs() {
    const args = process.argv.slice(2);
    const opts = {};
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            let optName = args[i].slice(2);
            if (optName === undefined) {
                continue;
            }
            const val = args[i + 1];
            if (!opts[optName]) {
                opts[optName] = val;
            } else {
                if (!Array.isArray(opts[optName])) {
                    opts[optName] = [opts[optName]];
                }
                opts[optName].push(val);
            }
            i++;
        }
    }
    return opts;
}

function walk(dir, exts, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
            walk(full, exts, out);
        } else if (exts.includes(path.extname(entry.name))) {
            out.push(full);
        }
    }
    return out;
}

function stripComments(content) {
    // Remove multiline comments while preserving line numbers
    let clean = content.replace(/\/\*[\s\S]*?\*\//g, (match) => {
        return match.replace(/[^\r\n]/g, ' ');
    });
    // delete all single line comments
    return clean.split('\n').map(line => {
        const idx = line.indexOf('//');
        if (idx !== -1) {
            // If the '//' is part of a URL (e.g., http://), we should not strip it. We can check if the character before '//' is a colon.
            if (idx > 0 && line[idx - 1] === ':') {
                return line;
            }
            return line.slice(0, idx);
        }
        return line;
    }).join('\n');
}

function extractDefinedTokensFromCss(content) {
    const defined = new Set();
    const re = /--([\w-]+)\s*:/g;
    let m;
    while ((m = re.exec(content))) defined.add(m[1]);
    return defined;
}

function extractDefinedTokens(tokensPath) {
    const defined = new Set();
    const files = Array.isArray(tokensPath) ? tokensPath : [tokensPath];

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const set = extractDefinedTokensFromCss(content);
        set.forEach((t) => defined.add(t));
    }

    return defined;
}

function extractUsedTokens(files) {
    const usages = []; // { token, file, line }
    for (const file of files) {
        const rawContent = fs.readFileSync(file, 'utf8');
        const content = stripComments(rawContent);
        content.split('\n').forEach((lineContent, idx) => {
            // var(--name, ...) -> if in usage of var(--name) there is a comma, it means that there is a fallback value. We do not report it as broken.
            const lineRe = /var\(\s*--([\w-]+)\s*([,)])/g;
            let m;
            while ((m = lineRe.exec(lineContent))) {
                const token = m[1];
                const delimiter = m[2];
                if (delimiter === ',') {
                    continue;
                }
                usages.push({ token, file, line: idx + 1 });
            }
        });
    }
    return usages;
}

function main() {
    const opts = parseArgs();
    if (!opts.tokens || !opts.src) {
        console.error(
            'Usage: node audit-tokens.js --tokens <fichier tokens> --src <dossier composants> [--out <rapport.md>]'
        );
        process.exit(1);
    }

    const definedGlobal = extractDefinedTokens(opts.tokens);
    const sourceCssVariablesfiles = walk(opts.src, ['.ts', '.tsx', '.scss', '.css', '.html']);
    const usages = extractUsedTokens(sourceCssVariablesfiles);

    // Variables locally declared (ex: --wcs-button-***: var(--wcs-semantic-***);) in components, which are not part of the global design tokens
    const definedLocal = new Map(); // token -> [{file, line}]
    for (const file of sourceCssVariablesfiles) {
        if (!/\.(css|scss)$/.test(file)) continue;
        const rawContent = fs.readFileSync(file, 'utf8');
        const content = stripComments(rawContent);
        content.split('\n').forEach((lineContent, idx) => {
            const re = /--([\w-]+)\s*:/g;
            let m;
            while ((m = re.exec(lineContent))) {
                if (!definedLocal.has(m[1])) definedLocal.set(m[1], []);
                definedLocal.get(m[1]).push({ file, line: idx + 1 });
            }
        });
    }

    const defined = new Set([...definedGlobal, ...definedLocal.keys()]);
    const broken = usages.filter((u) => !defined.has(u.token));

    console.info(`\n[diagnostic] ${definedGlobal.size} tokens globaux trouvés`);
    console.info(`[diagnostic] ${definedLocal.size} variables locales déclarées dans les composants (--src)`);
    console.info(`[diagnostic] ${usages.length} usages var(--token) vérifiés (hors fallbacks)`);

    const lines = [];
    lines.push(`# Rapport d'audit des design tokens\n`);
    lines.push(`Fichiers scannés : ${sourceCssVariablesfiles.length}`);
    lines.push(`Tokens définis (post-migration) : ${defined.size}`);
    lines.push(`Références var(--token) trouvées (hors fallbacks) : ${usages.length}\n`);

    lines.push(`## ❌ Références cassées (token inconnu) : ${broken.length}`);
    broken.forEach((u) => lines.push(`- \`--${u.token}\` — ${u.file}:${u.line}`));

    const report = lines.join('\n');

    if (opts.out) {
        fs.writeFileSync(opts.out, report);
        console.log(`\nRapport écrit dans ${opts.out}`);
    }

    if (broken.length > 0) {
        console.error(`\n❌ Échec : ${broken.length} références de tokens cassées trouvées.`);
        for (const u of broken) {
            console.error(`- \`--${u.token}\` — ${u.file}:${u.line}`);
        }
        process.exit(1);
    } else {
        console.log(`\n✅ Succès : toutes les références de tokens sont valides.`);
        process.exit(0);
    }
}

main();
