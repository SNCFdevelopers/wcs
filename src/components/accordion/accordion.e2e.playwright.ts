import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";
import { expect } from "@playwright/test";

test.describe('accordion', () => {
    
    test.describe('common behavior', () => {
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

        test('should handle deeply nested accordions independently', async ({ page }: { page: E2EPage }) => {
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

    test.describe('single expansion mode (default)', () => {
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

        test('should close other panels when dynamically adding a new open panel', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-accordion id="parent-accordion">
                    <wcs-accordion-panel id="parent-panel">
                        <wcs-accordion-header>Configuration générale</wcs-accordion-header>
                        <wcs-accordion-content>
                            <wcs-accordion id="nested-accordion">
                                <wcs-accordion-panel id="static-panel">
                                    <wcs-accordion-header>Paramètres utilisateur</wcs-accordion-header>
                                    <wcs-accordion-content>Gestion des préférences utilisateur</wcs-accordion-content>
                                </wcs-accordion-panel>
                            </wcs-accordion>
                        </wcs-accordion-content>
                    </wcs-accordion-panel>
                </wcs-accordion>
            `);

            // When - Open parent panel first
            const parentPanel = page.locator('#parent-panel');
            await parentPanel.click();
            await page.waitForChanges();

            // Then
            await expect(parentPanel).toHaveJSProperty('open', true);

            // When - Add first dynamic panel with open=true
            await page.evaluate(() => {
                const nestedAccordion = document.querySelector('#nested-accordion');
                const dynamicPanel1 = document.createElement('wcs-accordion-panel');
                dynamicPanel1.id = 'dynamic-panel-1';
                dynamicPanel1.setAttribute('open', 'true');
                dynamicPanel1.innerHTML = `
                    <wcs-accordion-header>Panel dynamique #1</wcs-accordion-header>
                    <wcs-accordion-content>Contenu dynamique 1</wcs-accordion-content>
                `;
                nestedAccordion.appendChild(dynamicPanel1);
            });
            await page.waitForChanges();

            const staticPanel = page.locator('#static-panel');
            const dynamicPanel1 = page.locator('#dynamic-panel-1');

            // Then - Static panel should be closed, dynamic panel 1 should be open
            await expect(staticPanel).toHaveJSProperty('open', false);
            await expect(dynamicPanel1).toHaveJSProperty('open', true);

            // When - Add second dynamic panel with open=true
            await page.evaluate(() => {
                const nestedAccordion = document.querySelector('#nested-accordion');
                const dynamicPanel2 = document.createElement('wcs-accordion-panel');
                dynamicPanel2.id = 'dynamic-panel-2';
                dynamicPanel2.setAttribute('open', 'true');
                dynamicPanel2.innerHTML = `
                    <wcs-accordion-header>Panel dynamique #2</wcs-accordion-header>
                    <wcs-accordion-content>Contenu dynamique 2</wcs-accordion-content>
                `;
                nestedAccordion.appendChild(dynamicPanel2);
            });
            await page.waitForChanges();

            const dynamicPanel2 = page.locator('#dynamic-panel-2');

            // Then - Dynamic panel 1 should be closed, dynamic panel 2 should be open
            await expect(staticPanel).toHaveJSProperty('open', false);
            await expect(dynamicPanel1).toHaveJSProperty('open', false);
            await expect(dynamicPanel2).toHaveJSProperty('open', true);

            // And - Parent panel should remain open (different accordion level)
            await expect(parentPanel).toHaveJSProperty('open', true);
        });
    });

    test.describe('multiple expansion mode', () => {
        test('should keep other panels open when opening a new one', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-accordion multi-expandable>
                    <wcs-accordion-panel>
                        <wcs-accordion-header>Panel 1</wcs-accordion-header>
                        <wcs-accordion-content>Content 1</wcs-accordion-content>
                    </wcs-accordion-panel>
                    <wcs-accordion-panel>
                        <wcs-accordion-header>Panel 2</wcs-accordion-header>
                        <wcs-accordion-content>Content 2</wcs-accordion-content>
                    </wcs-accordion-panel>
                    <wcs-accordion-panel>
                        <wcs-accordion-header>Panel 3</wcs-accordion-header>
                        <wcs-accordion-content>Content 3</wcs-accordion-content>
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
            await expect(panels.nth(2)).toHaveJSProperty('open', false);

            // When - Open second panel
            await panels.nth(1).click();
            await page.waitForChanges();

            // Then - Both panels should be open
            await expect(panels.nth(0)).toHaveJSProperty('open', true);
            await expect(panels.nth(1)).toHaveJSProperty('open', true);
            await expect(panels.nth(2)).toHaveJSProperty('open', false);

            // When - Open third panel
            await panels.nth(2).click();
            await page.waitForChanges();

            // Then - All panels should be open
            await expect(panels.nth(0)).toHaveJSProperty('open', true);
            await expect(panels.nth(1)).toHaveJSProperty('open', true);
            await expect(panels.nth(2)).toHaveJSProperty('open', true);
        });

        test('should allow closing individual panels independently', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-accordion multi-expandable>
                    <wcs-accordion-panel open="true">
                        <wcs-accordion-header>Panel 1</wcs-accordion-header>
                        <wcs-accordion-content>Content 1</wcs-accordion-content>
                    </wcs-accordion-panel>
                    <wcs-accordion-panel open="true">
                        <wcs-accordion-header>Panel 2</wcs-accordion-header>
                        <wcs-accordion-content>Content 2</wcs-accordion-content>
                    </wcs-accordion-panel>
                    <wcs-accordion-panel open="true">
                        <wcs-accordion-header>Panel 3</wcs-accordion-header>
                        <wcs-accordion-content>Content 3</wcs-accordion-content>
                    </wcs-accordion-panel>
                </wcs-accordion>
            `);

            const panels = page.locator('wcs-accordion-panel');

            // All panels should start open
            await expect(panels.nth(0)).toHaveJSProperty('open', true);
            await expect(panels.nth(1)).toHaveJSProperty('open', true);
            await expect(panels.nth(2)).toHaveJSProperty('open', true);

            // When - Close second panel
            await panels.nth(1).click();
            await page.waitForChanges();

            // Then - Only second panel should be closed
            await expect(panels.nth(0)).toHaveJSProperty('open', true);
            await expect(panels.nth(1)).toHaveJSProperty('open', false);
            await expect(panels.nth(2)).toHaveJSProperty('open', true);
        });

        test('should not close other panels when dynamically adding a new open panel', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-accordion multi-expandable id="multi-accordion">
                    <wcs-accordion-panel id="panel-1" open="true">
                        <wcs-accordion-header>Panel 1</wcs-accordion-header>
                        <wcs-accordion-content>Content 1</wcs-accordion-content>
                    </wcs-accordion-panel>
                    <wcs-accordion-panel id="panel-2">
                        <wcs-accordion-header>Panel 2</wcs-accordion-header>
                        <wcs-accordion-content>Content 2</wcs-accordion-content>
                    </wcs-accordion-panel>
                </wcs-accordion>
            `);

            const panel1 = page.locator('#panel-1');
            const panel2 = page.locator('#panel-2');

            // Then - Panel 1 should be open
            await expect(panel1).toHaveJSProperty('open', true);
            await expect(panel2).toHaveJSProperty('open', false);

            // When - Add dynamic panel with open=true
            await page.evaluate(() => {
                const accordion = document.querySelector('#multi-accordion');
                const dynamicPanel = document.createElement('wcs-accordion-panel');
                dynamicPanel.id = 'dynamic-panel';
                dynamicPanel.setAttribute('open', 'true');
                dynamicPanel.innerHTML = `
                    <wcs-accordion-header>Panel dynamique</wcs-accordion-header>
                    <wcs-accordion-content>Contenu dynamique</wcs-accordion-content>
                `;
                accordion.appendChild(dynamicPanel);
            });
            await page.waitForChanges();

            const dynamicPanel = page.locator('#dynamic-panel');

            // Then - Panel 1 should remain open, dynamic panel should also be open
            await expect(panel1).toHaveJSProperty('open', true);
            await expect(panel2).toHaveJSProperty('open', false);
            await expect(dynamicPanel).toHaveJSProperty('open', true);
        });

        test('should work with nested accordions in multi-expandable mode', async ({ page }: { page: E2EPage }) => {
            // Given
            await setWcsContent(page, `
                <wcs-accordion multi-expandable>
                    <wcs-accordion-panel id="parent-1">
                        <wcs-accordion-header>Parent Panel 1</wcs-accordion-header>
                        <wcs-accordion-content>
                            <wcs-accordion multi-expandable>
                                <wcs-accordion-panel id="child-1-1">
                                    <wcs-accordion-header>Child Panel 1.1</wcs-accordion-header>
                                    <wcs-accordion-content>Child content 1.1</wcs-accordion-content>
                                </wcs-accordion-panel>
                                <wcs-accordion-panel id="child-1-2">
                                    <wcs-accordion-header>Child Panel 1.2</wcs-accordion-header>
                                    <wcs-accordion-content>Child content 1.2</wcs-accordion-content>
                                </wcs-accordion-panel>
                            </wcs-accordion>
                        </wcs-accordion-content>
                    </wcs-accordion-panel>
                    <wcs-accordion-panel id="parent-2">
                        <wcs-accordion-header>Parent Panel 2</wcs-accordion-header>
                        <wcs-accordion-content>Parent content 2</wcs-accordion-content>
                    </wcs-accordion-panel>
                </wcs-accordion>
            `);

            const parent1 = page.locator('#parent-1');
            const parent2 = page.locator('#parent-2');

            // When - Open both parent panels
            await parent1.click();
            await page.waitForChanges();
            await parent2.click();
            await page.waitForChanges();

            // Then - Both parents should be open
            await expect(parent1).toHaveJSProperty('open', true);
            await expect(parent2).toHaveJSProperty('open', true);

            // When - Open both nested panels
            const child11 = page.locator('#child-1-1');
            const child12 = page.locator('#child-1-2');
            await child11.click();
            await page.waitForChanges();
            await child12.click();
            await page.waitForChanges();

            // Then - All panels should be open
            await expect(parent1).toHaveJSProperty('open', true);
            await expect(parent2).toHaveJSProperty('open', true);
            await expect(child11).toHaveJSProperty('open', true);
            await expect(child12).toHaveJSProperty('open', true);
        });
    });
});
