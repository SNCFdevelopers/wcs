import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('breadcrumb collapse', () => {
    test('should hide breadcrumb item and respect default values for itemsBeforeCollapse and itemsAfterCollapse props', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const homeItem = page.locator('.home-item');
        const trainItem = page.locator('.train-item');
        const ticketItem = page.locator('.ticket-item');
        const detail = page.locator('.detail-item');

        await expect(homeItem).toHaveAttribute('slot', 'items-before-expand-btn');
        await expect(trainItem).toHaveAttribute('slot', 'hidden-items');
        await expect(ticketItem).toHaveAttribute('slot', 'items-after-expand-btn');
        await expect(detail).toHaveAttribute('slot', 'items-after-expand-btn');
    });

    test('should hide breadcrumb item and respect user values for itemsBeforeCollapse and itemsAfterCollapse props', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3" items-before-collapse="2" items-after-collapse="1">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const homeItem = page.locator('.home-item');
        const trainItem = page.locator('.train-item');
        const ticketItem = page.locator('.ticket-item');
        const detail = page.locator('.detail-item');

        await expect(homeItem).toHaveAttribute('slot', 'items-before-expand-btn');
        await expect(trainItem).toHaveAttribute('slot', 'items-before-expand-btn');
        await expect(ticketItem).toHaveAttribute('slot', 'hidden-items');
        await expect(detail).toHaveAttribute('slot', 'items-after-expand-btn');
    });

    test('shouldn\'t hide breadcrumb item if max item attribute is not defined', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb>
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const homeItem = page.locator('.home-item');
        const trainItem = page.locator('.train-item');
        const ticketItem = page.locator('.ticket-item');
        const detail = page.locator('.detail-item');

        await expect(homeItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(trainItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(ticketItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(detail).toHaveAttribute('slot', 'non-collapsed');
    });

    test('sould hide appended breadcrumb item', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.evaluate(() => {
            const breadcrumbItem = document.createElement('wcs-breadcrumb-item');
            breadcrumbItem.classList.add('detail-item');
            breadcrumbItem.textContent = 'Details';
            const breadcrumb = document.querySelector('wcs-breadcrumb');
            breadcrumb!.appendChild(breadcrumbItem);
        });

        const homeItem = page.locator('.home-item');
        const trainItem = page.locator('.train-item');
        const ticketItem = page.locator('.ticket-item');
        const detail = page.locator('.detail-item');

        await expect(homeItem).toHaveAttribute('slot', 'items-before-expand-btn');
        await expect(trainItem).toHaveAttribute('slot', 'hidden-items');
        await expect(ticketItem).toHaveAttribute('slot', 'items-after-expand-btn');
        await expect(detail).toHaveAttribute('slot', 'items-after-expand-btn');
    });

    test('should display all breadcrumb items when the max-items prop is mutated in js', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const homeItem = page.locator('.home-item');
        const trainItem = page.locator('.train-item');
        const ticketItem = page.locator('.ticket-item');
        const detail = page.locator('.detail-item');

        await expect(homeItem).toHaveAttribute('slot', 'items-before-expand-btn');
        await expect(trainItem).toHaveAttribute('slot', 'hidden-items');
        await expect(ticketItem).toHaveAttribute('slot', 'items-after-expand-btn');
        await expect(detail).toHaveAttribute('slot', 'items-after-expand-btn');

        const breadcrumb = page.locator('wcs-breadcrumb');
        await breadcrumb.evaluate((el: any) => el.maxItems = undefined);

        await expect(homeItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(trainItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(ticketItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(detail).toHaveAttribute('slot', 'non-collapsed');
    });

    test('should collapse all breadcrumb items when the max-items prop is mutated in js', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb>
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const homeItem = page.locator('.home-item');
        const trainItem = page.locator('.train-item');
        const ticketItem = page.locator('.ticket-item');
        const detail = page.locator('.detail-item');

        await expect(homeItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(trainItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(ticketItem).toHaveAttribute('slot', 'non-collapsed');
        await expect(detail).toHaveAttribute('slot', 'non-collapsed');

        const breadcrumb = page.locator('wcs-breadcrumb');
        await breadcrumb.evaluate((el: any) => el.maxItems = 3);

        await expect(homeItem).toHaveAttribute('slot', 'items-before-expand-btn');
        await expect(trainItem).toHaveAttribute('slot', 'hidden-items');
        await expect(ticketItem).toHaveAttribute('slot', 'items-after-expand-btn');
        await expect(detail).toHaveAttribute('slot', 'items-after-expand-btn');
    });

    test('should expand collapsed items when user click on expand button', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const nav = page.locator('wcs-breadcrumb nav');
        const expandBtn = page.locator(`wcs-breadcrumb wcs-button`);
        await expandBtn.click();
        await page.waitForChanges();

        await expect(nav).toHaveClass(/show-hidden-items/);
    });

    test('should update aria-label attribute after the first render', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb>
                <wcs-breadcrumb-item>Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Tickets</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const wcsBreadcrumb = page.locator('wcs-breadcrumb');

        // When
        await wcsBreadcrumb.evaluate((el: any) => el.setAriaAttribute('aria-label', 'new label'));

        // Then
        const navEl = page.locator('wcs-breadcrumb nav');
        await expect(navEl).toHaveAttribute('aria-label', 'new label');
    });

    test('should update expand button aria-label attribute', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        const wcsBreadcrumb = page.locator('wcs-breadcrumb');

        // When
        const newAriaLabelValue = 'New label';
        await wcsBreadcrumb.evaluate((el: any, value: string) => el.ariaLabelExpandButton = value, newAriaLabelValue);

        // Then
        const expandBtn = page.locator('wcs-breadcrumb button.wcs-inner-button');
        await expect(expandBtn).toHaveAttribute('aria-label', newAriaLabelValue);
    });
});
