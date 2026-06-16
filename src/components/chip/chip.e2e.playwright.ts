import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Chip component', () => {
    test.describe('Events', () => {
        test('should emit wcsChipSelectChange with selected=true on click (selectable by default)', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const wcsChipSelectChangeEventSpy = await chip.spyOnEvent('wcsChipSelectChange');

            // When
            await chip.click();
            await page.waitForChanges();

            // Then
            expect(wcsChipSelectChangeEventSpy).toHaveReceivedEventDetail({ value: 'chip-id', selected: true });
        });

        test('should toggle selection and emit on Space/Enter (selectable)', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const wcsChipSelectChangeEventSpy = await chip.spyOnEvent('wcsChipSelectChange');

            // When - Space selects
            await chip.focus();
            await chip.press('Space');
            // When - Enter toggles back
            await chip.press('Enter');
            await page.waitForChanges();

            // Then
            expect(wcsChipSelectChangeEventSpy).toHaveReceivedEventTimes(2);
            expect(wcsChipSelectChangeEventSpy).toHaveNthReceivedEventDetail(1, { value: 'chip-id', selected: false });
        });

        test('should emit wcsChipDismiss when clicking dismiss button (dismissible)', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const wcsChipDismissEventSpy = await chip.spyOnEvent('wcsChipDismiss');
            const dismissBtn = page.locator('wcs-chip button');

            // When
            await dismissBtn.click();
            await page.waitForChanges();

            // Then
            expect(wcsChipDismissEventSpy).toHaveReceivedEventDetail({ value: 'chip-id' });
            // open prop should be false -> attribute removed
            await expect(chip).not.toHaveAttribute('open');
        });
    });

    test.describe('Keyboard', () => {
        test('Delete/Backspace on dismiss button dismisses the chip', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const wcsChipDismissEventSpy = await chip.spyOnEvent('wcsChipDismiss');
            const dismissBtn = page.locator('wcs-chip button');

            // When
            await dismissBtn.focus();
            await page.keyboard.press('Delete');
            await page.waitForChanges();

            // Then
            await expect(wcsChipDismissEventSpy).toHaveReceivedEventTimes(1);
            await expect(chip).not.toHaveAttribute('open');
        });
    });

    test.describe('Accessibility', () => {
        test('exposes proper ARIA for selectable: role=checkbox, aria-checked toggles, tabindex respects disabled', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');

            // Then default
            await expect(chip).toHaveAttribute('role', 'checkbox');
            await expect(chip).toHaveAttribute('aria-checked', 'false');
            await expect(chip).toHaveAttribute('tabindex', '0');

            // When
            await chip.click();
            await page.waitForChanges();

            // Then toggled
            await expect(chip).toHaveAttribute('aria-checked', 'true');
        });

        test('exposes proper ARIA/disabled for dismissible: button has label and respects disabled', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const btn = page.locator('wcs-chip button');

            // Then
            await expect(btn).toHaveAttribute('aria-label', 'Supprimer Chip');

            // When disabled
            await chip.evaluate((el: any) => el.disabled = true);
            await page.waitForChanges();

            // Then
            await expect(chip).toHaveAttribute('aria-disabled', 'true');
            await expect(btn).toBeDisabled();
        });
    });

    test.describe('Disabled state', () => {
        test('does not emit select event when disabled (click and Space)', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip disabled value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const wcsChipSelectChangeEventSpy = await chip.spyOnEvent('wcsChipSelectChange');

            // When
            await chip.click({ force: true });
            await chip.press('Space');
            await page.waitForChanges();

            // Then
            expect(wcsChipSelectChangeEventSpy).toHaveReceivedEventTimes(0);
            await expect(chip).toHaveAttribute('tabindex', '-1');
            await expect(chip).toHaveAttribute('aria-checked', 'false');
        });

        test('does not emit dismiss event when disabled', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-chip disabled mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);

            const chip = page.locator('wcs-chip');
            const wcsChipDismissEventSpy = await chip.spyOnEvent('wcsChipDismiss');
            const btn = page.locator('wcs-chip button');

            // When
            await btn.click({ force: true });
            await page.waitForChanges();

            // Then
            expect(wcsChipDismissEventSpy).toHaveReceivedEventTimes(0);
            await expect(chip).toHaveAttribute('open', '');
        });
    });

    test.describe('Focus management', () => {
        test('after dismiss, focus moves to next actionable chip (selectable host)', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" mode="dismissible" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" value="c2" label="Two"></wcs-chip>
                </div>
            `);

            const btn = page.locator('#c1 button');

            // When
            await btn.click();
            await page.waitForChanges();

            // Then
            const c2 = page.locator('#c2');
            await expect(c2).toBeFocused();
        });

        test('after dismiss, focus moves to next actionable chip (dismissable host)', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" mode="dismissible" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" mode="dismissible" value="c2" label="Two"></wcs-chip>
                </div>
            `);

            const c1 = page.locator('#c1 button');

            // When
            await c1.click();
            await page.waitForChanges();

            // Then
            const c2 = page.locator('#c2');
            await expect(c2).toBeFocused();
        });

        test('skips disabled chips when moving focus after dismiss', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" mode="dismissible" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" disabled value="c2" label="Two"></wcs-chip>
                    <wcs-chip id="c3" value="c3" label="Three"></wcs-chip>
                </div>
            `);

            const btn = page.locator('#c1 button');

            // When
            await btn.click();
            await page.waitForChanges();

            // Then
            const c3 = page.locator('#c3');
            await expect(c3).toBeFocused();
        });

        test('after dismissing the last chip, focus moves to previous actionable chip', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" mode="dismissible" value="c2" label="Two"></wcs-chip>
                </div>
            `);

            const c2 = page.locator('#c2 button');

            // When
            await c2.click();
            await page.waitForChanges();

            // Then
            const c1 = page.locator('#c1');
            await expect(c1).toBeFocused();
        });

        test('skips disabled previous chips when moving focus after dismissing the last chip', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" disabled value="c2" label="Two"></wcs-chip>
                    <wcs-chip id="c3" mode="dismissible" value="c3" label="Three"></wcs-chip>
                </div>
            `);

            const c3 = page.locator('#c3 button');

            // When
            await c3.click();
            await page.waitForChanges();

            // Then
            const c1 = page.locator('#c1');
            await expect(c1).toBeFocused();
        });
    });
});
