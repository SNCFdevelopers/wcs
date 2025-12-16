import { expect } from '@playwright/test';
import { matchers, createConfig } from '@stencil/playwright';

expect.extend(matchers);

export default createConfig({
    testMatch: '*.e2e.playwright.ts',
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
            },
        }
    ],
    retries: process.env.CI ? 3 : 0,
    use: {
        baseURL: 'http://localhost:3333',
        actionTimeout: 0,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },
    reporter: 'list',
    webServer: {
        command: 'npm run start:test',
        url: 'http://localhost:3333/ping',
        reuseExistingServer: !process.env.CI,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
