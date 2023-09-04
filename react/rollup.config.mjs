import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

/** @type {import('rollup').RollupOptions} */
const options = {
    input: {
        index: 'dist-transpiled/index',
    },
    output: [
        {
            dir: 'dist/',
            entryFileNames: '[name].js',
            chunkFileNames: '[name]-[hash].js',
            format: 'es',
            sourcemap: true,
        }],
    external: (id) => {
        return (
            id.startsWith('react') ||
            id.startsWith('react-dom') ||
            id.startsWith('wcs-core')
        );
    },
    plugins: [
        resolve(),
        sourcemaps(),
    ],
};

export default options;
