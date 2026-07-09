import { createConfig } from '@stencil/playwright';

/**
 * Component-level visual spec configuration.
 */
export default createConfig({
    testMatch: ['**/*.visual.spec.ts'],
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                viewport: { width: 1280, height: 800 },
            },
        },
    ],
    retries: process.env.CI ? 2 : 0,
    fullyParallel: !process.env.CI,
    workers: process.env.CI ? 1 : 8,
    use: {
        baseURL: 'http://localhost:3333',
        actionTimeout: 10000,
        trace: 'on-first-retry',
    },
    reporter: process.env.CI ? 'blob' : [['html', { outputFolder: 'playwright-report-visual-spec', open: 'never' }]],
    timeout: 120000,
    snapshotPathTemplate: '__screenshots__/{testFileName}/{arg}-{projectName}-{platform}{ext}',
    webServer: {
        command: 'npm run start:test',
        url: 'http://localhost:3333/ping',
        reuseExistingServer: !process.env.CI,
        stdout: 'pipe',
        stderr: 'pipe',
        timeout: 250_000
    },
});
