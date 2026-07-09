import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-alert-drawer · visual spec', () => {
    test('position-top', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="top"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('position-top.png', { fullPage: true });
    });

    test('position-bottom', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="bottom"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('position-bottom.png', { fullPage: true });
    });

    test('position-top-left', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="top-left"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('position-top-left.png', { fullPage: true });
    });

    test('position-top-right', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="top-right"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();
        await expect(page).toHaveScreenshot('position-top-right.png', { fullPage: true });
    });

    test('position-bottom-left', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="bottom-left"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('position-bottom-left.png', { fullPage: true });
    });

    test('position-bottom-right', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="bottom-right"></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            showProgressBar: false,
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            showProgressBar: false,
            timeout: 0
        }));
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('position-bottom-right.png', { fullPage: true });
    });

    test('show-progress-bar', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-alert-drawer position="top-right" show-progress-bar></wcs-alert-drawer>
        `);

        const alertDrawer = page.locator('wcs-alert-drawer');
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'success',
            timeout: 0
        }));
        await alertDrawer.evaluate((el: any) => el.show({
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            intent: 'information',
            timeout: 0
        }));
        await page.waitForChanges();

        await expect(page).toHaveScreenshot('show-progress-bar.png', { fullPage: true });
    });
});
