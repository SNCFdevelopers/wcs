import path from 'node:path';

export const toPosixPath = (value) => value.split(/\\+/).join('/');

/** Computes a relative POSIX link between two skill-root-relative paths. */
export const relativeLink = (fromFile, toFile) => toPosixPath(path.relative(path.dirname(fromFile), toFile));

export const escapeCell = (value) =>
    String(value ?? '')
        .replace(/\r?\n/g, ' ')
        .replace(/\|/g, '\\|')
        .trim();

/** Escapes only pipe characters, for use inside backtick-wrapped table cells (types, signatures). */
export const escapePipes = (value) => String(value ?? '').replace(/\|/g, '\\|');

export const markdownTable = (headers, rows) => {
    if (rows.length === 0) return '_None._';
    const headerLine = `| ${headers.join(' | ')} |`;
    const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;
    const bodyLines = rows.map((row) => `| ${row.join(' | ')} |`);
    return [headerLine, separatorLine, ...bodyLines].join('\n');
};

/**
 * A one-line summary for a component's index row: first sentence of its docs, or a fallback.
 * Markdown links are flattened to plain text first so truncation can never cut a link in half and
 * corrupt the enclosing table row.
 */
export const summarize = (component) => {
    const text = (component.docs || '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (!text) return `\`${component.tag}\` component.`;
    const firstSentence = text.split(/(?<=[.!?])\s/)[0];
    return firstSentence.length > 160 ? `${firstSentence.slice(0, 157)}...` : firstSentence;
};
