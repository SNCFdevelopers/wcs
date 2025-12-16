import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";
import { expect } from "@playwright/test";

test.describe('accordion', () => {
    test('should open and close accordion panels', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-accordion>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Panel 1</wcs-accordion-header>
                    <wcs-accordion-content>Content 1</wcs-accordion-content>
                </wcs-accordion-panel>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Panel 2</wcs-accordion-header>
                    <wcs-accordion-content>Content 2</wcs-accordion-content>
                </wcs-accordion-panel>
            </wcs-accordion>
        `);

        const panels = page.locator('wcs-accordion-panel');

        // When
        await panels.nth(0).click();
        await page.waitForChanges();

        // Then
        await expect(panels.nth(0)).toHaveJSProperty('open', true);
        await expect(panels.nth(1)).toHaveJSProperty('open', false);
    });

    test('should close other panels when opening a new one at the same level', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-accordion>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Panel 1</wcs-accordion-header>
                    <wcs-accordion-content>Content 1</wcs-accordion-content>
                </wcs-accordion-panel>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Panel 2</wcs-accordion-header>
                    <wcs-accordion-content>Content 2</wcs-accordion-content>
                </wcs-accordion-panel>
            </wcs-accordion>
        `);

        const panels = page.locator('wcs-accordion-panel');

        // When - Open first panel
        await panels.nth(0).click();
        await page.waitForChanges();

        // Then
        await expect(panels.nth(0)).toHaveJSProperty('open', true);
        await expect(panels.nth(1)).toHaveJSProperty('open', false);

        // When - Open second panel
        await panels.nth(1).click();
        await page.waitForChanges();

        // Then - First panel should be closed
        await expect(panels.nth(0)).toHaveJSProperty('open', false);
        await expect(panels.nth(1)).toHaveJSProperty('open', true);
    });

    test('should not close parent accordion when opening nested accordion', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-accordion>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Parent Panel 1</wcs-accordion-header>
                    <wcs-accordion-content>
                        <p>Parent content</p>
                        <wcs-accordion>
                            <wcs-accordion-panel>
                                <wcs-accordion-header>Child Panel 1</wcs-accordion-header>
                                <wcs-accordion-content>Child content 1</wcs-accordion-content>
                            </wcs-accordion-panel>
                            <wcs-accordion-panel>
                                <wcs-accordion-header>Child Panel 2</wcs-accordion-header>
                                <wcs-accordion-content>Child content 2</wcs-accordion-content>
                            </wcs-accordion-panel>
                        </wcs-accordion>
                    </wcs-accordion-content>
                </wcs-accordion-panel>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Parent Panel 2</wcs-accordion-header>
                    <wcs-accordion-content>Parent content 2</wcs-accordion-content>
                </wcs-accordion-panel>
            </wcs-accordion>
        `);

        const parentPanels = page.locator('wcs-accordion > wcs-accordion-panel');

        // When - Open parent panel first
        await parentPanels.nth(0).click();
        await page.waitForChanges();

        // Then
        await expect(parentPanels.nth(0)).toHaveJSProperty('open', true);

        // When - Open nested accordion panel
        const nestedPanels = page.locator('wcs-accordion wcs-accordion wcs-accordion-panel');
        await nestedPanels.nth(0).click();
        await page.waitForChanges();

        // Then - Parent should remain open, nested panel should be open
        await expect(parentPanels.nth(0)).toHaveJSProperty('open', true);
        await expect(nestedPanels.nth(0)).toHaveJSProperty('open', true);
    });

    test('should not close nested accordions when opening another parent panel', async ({ page }: { page: E2EPage }) => {
        // Given
        await setWcsContent(page, `
            <wcs-accordion id="parent-accordion">
                <wcs-accordion-panel>
                    <wcs-accordion-header>Parent Panel 1</wcs-accordion-header>
                    <wcs-accordion-content>
                        <wcs-accordion>
                            <wcs-accordion-panel>
                                <wcs-accordion-header>Child Panel 1</wcs-accordion-header>
                                <wcs-accordion-content>Child content 1</wcs-accordion-content>
                            </wcs-accordion-panel>
                        </wcs-accordion>
                    </wcs-accordion-content>
                </wcs-accordion-panel>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Parent Panel 2</wcs-accordion-header>
                    <wcs-accordion-content>
                        <wcs-accordion>
                            <wcs-accordion-panel>
                                <wcs-accordion-header>Child Panel 2</wcs-accordion-header>
                                <wcs-accordion-content>Child content 2</wcs-accordion-content>
                            </wcs-accordion-panel>
                        </wcs-accordion>
                    </wcs-accordion-content>
                </wcs-accordion-panel>
            </wcs-accordion>
        `);

        const parentPanels = page.locator('#parent-accordion > wcs-accordion-panel');

        // When - Open first parent and its nested panel
        await parentPanels.nth(0).click();
        await page.waitForChanges();

        const firstNestedPanel = page.locator('wcs-accordion > wcs-accordion-panel:first-child wcs-accordion-panel');
        await firstNestedPanel.click();
        await page.waitForChanges();

        // Then
        await expect(parentPanels.nth(0)).toHaveJSProperty('open', true);
        await expect(firstNestedPanel).toHaveJSProperty('open', true);

        // When - Open second parent
        await parentPanels.nth(1).click();
        await page.waitForChanges();

        const secondNestedPanel = page.locator('wcs-accordion > wcs-accordion-panel:nth-child(2) wcs-accordion-panel');

        // Then - First parent should close but nested panel state should be preserved
        await expect(parentPanels.nth(0)).toHaveJSProperty('open', false);
        await expect(parentPanels.nth(1)).toHaveJSProperty('open', true);
        await expect(firstNestedPanel).toHaveJSProperty('open', true); // Nested panel keeps its state
        await expect(secondNestedPanel).toHaveJSProperty('open', false);
    });

    test('should handle deeply nested accordions independently', async ({ page,  }) => {
        // Given
        await setWcsContent(page, `
            <wcs-accordion id="level1-accordion">
                <wcs-accordion-panel id="level1-panel">
                    <wcs-accordion-header>Level 1</wcs-accordion-header>
                    <wcs-accordion-content>
                        <wcs-accordion id="level2-accordion">
                            <wcs-accordion-panel id="level2-panel">
                                <wcs-accordion-header>Level 2</wcs-accordion-header>
                                <wcs-accordion-content>
                                    <wcs-accordion id="level3-accordion">
                                        <wcs-accordion-panel id="level3-panel">
                                            <wcs-accordion-header>Level 3</wcs-accordion-header>
                                            <wcs-accordion-content>Deep content</wcs-accordion-content>
                                        </wcs-accordion-panel>
                                    </wcs-accordion>
                                </wcs-accordion-content>
                            </wcs-accordion-panel>
                        </wcs-accordion>
                    </wcs-accordion-content>
                </wcs-accordion-panel>
            </wcs-accordion>
        `);

        // When - Open all levels progressively
        const level1Panel = page.locator('#level1-panel');
        await level1Panel.click();
        await page.waitForChanges();

        const level2Panel = page.locator('#level2-panel');
        await level2Panel.click();
        await page.waitForChanges();

        const level3Panel = page.locator('#level3-panel');
        await level3Panel.click();
        await page.waitForChanges();

        // Then - All levels should be open
        await expect(level1Panel).toHaveJSProperty('open', true);
        await expect(level2Panel).toHaveJSProperty('open', true);
        await expect(level3Panel).toHaveJSProperty('open', true);
    });
});
