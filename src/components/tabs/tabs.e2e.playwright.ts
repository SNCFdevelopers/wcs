import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Tabs component', () => {
    test('Display only first tab if none are preselected', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-tabs>
                <wcs-tab header="1">One</wcs-tab>
                <wcs-tab header="2">Two</wcs-tab>
            </wcs-tabs>
        `);

        const tab1 = page.locator('wcs-tab').nth(0);
        const tab2 = page.locator('wcs-tab').nth(1);

        // Then
        await expect(tab1).toBeVisible();
        await expect(tab2).not.toBeVisible();
    });

    test('Display only second tab if users click on its header', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-tabs>
                <wcs-tab header="1">One</wcs-tab>
                <wcs-tab header="2">Two</wcs-tab>
            </wcs-tabs>
        `);

        const tab1 = page.locator('wcs-tab').nth(0);
        const tab2 = page.locator('wcs-tab').nth(1);
        const tabh2 = page.locator('wcs-tabs .wcs-tab-header').nth(1);

        // When
        await tabh2.click();

        // Then
        await expect(tab1).not.toBeVisible();
        await expect(tab2).toBeVisible();
    });

    test('Accept and render new tabs after creation', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-tabs>
                <wcs-tab header="1">One</wcs-tab>
                <wcs-tab header="2">Two</wcs-tab>
            </wcs-tabs>
        `);

        // When
        await page.evaluate(async () => {
            const tab = document.createElement('wcs-tab');
            const text = document.createTextNode('Three');
            const tabsEl = document.querySelector('wcs-tabs');
            tab.setAttribute('header', '3');
            tab.appendChild(text);
            tabsEl!.appendChild(tab);
        });

        const h3 = page.locator('wcs-tabs .wcs-tab-header').nth(2);
        const t3 = page.locator('wcs-tab').nth(2);

        // Expect
        await expect(h3).toBeVisible();
        await expect(t3).toHaveText('Three');
    });

    test.describe('SelectedKey prop', () => {
        test('should accept a default selected key', async ({ page }: { page: E2EPage }) => {
            await setWcsContent(page, `
                <wcs-tabs selected-key="custom-2">
                    <wcs-tab item-key="custom-1">One</wcs-tab>
                    <wcs-tab item-key="custom-2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tab1 = page.locator('wcs-tab').nth(0);
            const tab2 = page.locator('wcs-tab').nth(1);

            await expect(tab1).not.toBeVisible();
            await expect(tab2).toBeVisible();
        });

        test('Allows to change selected tab via prop after creation', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs selected-key="a">
                    <wcs-tab item-key="a">One</wcs-tab>
                    <wcs-tab item-key="b">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tabs = page.locator('wcs-tabs');
            const tab1 = page.locator('wcs-tab').nth(0);
            const tab2 = page.locator('wcs-tab').nth(1);

            // When
            await tabs.evaluate((el: any) => el.selectedKey = 'b');

            // Then
            await expect(tab1).not.toBeVisible();
            await expect(tab2).toBeVisible();
        });
    });

    test.describe('SelectedIndex prop', () => {
        test('Accept a default selected tab', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs selected-index="1">
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tab1 = page.locator('wcs-tab').nth(0);
            const tab2 = page.locator('wcs-tab').nth(1);

            // Then
            await expect(tab1).not.toBeVisible();
            await expect(tab2).toBeVisible();
        });

        test('Allows to change selected tab via prop after creation', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs selected-index="1">
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tabs = page.locator('wcs-tabs');
            const tab1 = page.locator('wcs-tab').nth(0);
            const tab2 = page.locator('wcs-tab').nth(1);

            // When
            await tabs.evaluate((el: any) => el.selectedIndex = 0);

            // Then
            await expect(tab1).toBeVisible();
            await expect(tab2).not.toBeVisible();
        });
    });

    test.describe('Tab change event', () => {
        test('Fires when user clicks on a header', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tabs = page.locator('wcs-tabs');
            const tabChangeSpy = await tabs.spyOnEvent('tabChange');

            const tabh2 = page.locator('wcs-tabs .wcs-tab-header').nth(1);

            // When
            await tabh2.click();
            await page.waitForChanges();

            // Then
            expect(tabChangeSpy).toHaveReceivedEventTimes(1);
            expect(tabChangeSpy).toHaveReceivedEventDetail({ tabName: '2', tabIndex: 1, selectedKey: undefined });
        });
    });

    test.describe('Keyboard navigation', () => {
        test('Change selected tab with enter', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tabs = page.locator('wcs-tabs');
            const tabChangeEnterSpy = await tabs.spyOnEvent('tabChange');

            const h2 = page.locator('wcs-tabs .wcs-tab-header').nth(1);

            // When
            await h2.focus();
            await page.keyboard.press('Enter');
            await page.waitForChanges();

            // Then
            expect(tabChangeEnterSpy).toHaveReceivedEventTimes(1);
            expect(tabChangeEnterSpy).toHaveReceivedEventDetail({ tabName: '2', tabIndex: 1, selectedKey: undefined });
        });

        test('Change selected tab with space', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const tabs = page.locator('wcs-tabs');
            const tabChangeSpaceSpy = await tabs.spyOnEvent('tabChange');

            const h2 = page.locator('wcs-tabs .wcs-tab-header').nth(1);

            // When
            await h2.focus();
            await page.keyboard.press('Space');
            await page.waitForChanges();

            // Then
            expect(tabChangeSpaceSpy).toHaveReceivedEventTimes(1);
            expect(tabChangeSpaceSpy).toHaveReceivedEventDetail({ tabName: '2', tabIndex: 1, selectedKey: undefined });
        });

        test('Move focus with keyboard arrows', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);

            const h1 = page.locator('wcs-tabs .wcs-tab-header').nth(0);

            // When
            await h1.focus();
            await h1.press('ArrowRight');

            // Then - verify second header is focused by checking it matches activeElement in shadow root
            const isFocused = await page.evaluate(() => {
                const tabs = document.querySelector('wcs-tabs');
                const secondHeader = tabs?.shadowRoot?.querySelectorAll('.wcs-tab-header')[1];
                return tabs?.shadowRoot?.activeElement === secondHeader;
            });
            expect(isFocused).toBe(true);
        });
    });
});
