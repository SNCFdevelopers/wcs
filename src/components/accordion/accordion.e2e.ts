import { newE2EPage } from '@stencil/core/testing';
import { setWcsContent } from '../../utils/tests';

describe('accordion', () => {
    it('should open and close accordion panels', async () => {
        // Given
        const page = await newE2EPage();
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

        const panels = await page.findAll('wcs-accordion-panel');

        // When
        await panels[0].click();
        await page.waitForChanges();

        // Then
        expect(await panels[0].getProperty('open')).toBe(true);
        expect(await panels[1].getProperty('open')).toBe(false);
    });

    it('should close other panels when opening a new one at the same level', async () => {
        // Given
        const page = await newE2EPage();
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

        const panels = await page.findAll('wcs-accordion-panel');

        // When - Open first panel
        await panels[0].click();
        await page.waitForChanges();

        // Then
        expect(await panels[0].getProperty('open')).toBe(true);
        expect(await panels[1].getProperty('open')).toBe(false);

        // When - Open second panel
        await panels[1].click();
        await page.waitForChanges();

        // Then - First panel should be closed
        expect(await panels[0].getProperty('open')).toBe(false);
        expect(await panels[1].getProperty('open')).toBe(true);
    });

    it('should not close parent accordion when opening nested accordion', async () => {
        // Given
        const page = await newE2EPage();
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

        const parentPanels = await page.findAll('wcs-accordion > wcs-accordion-panel');

        // When - Open parent panel first
        await parentPanels[0].click();
        await page.waitForChanges();

        // Then
        expect(await parentPanels[0].getProperty('open')).toBe(true);

        // When - Open nested accordion panel
        const nestedPanels = await page.findAll('wcs-accordion wcs-accordion wcs-accordion-panel');
        await nestedPanels[0].click();
        await page.waitForChanges();

        // Then - Parent should remain open, nested panel should be open
        expect(await parentPanels[0].getProperty('open')).toBe(true);
        expect(await nestedPanels[0].getProperty('open')).toBe(true);
    });

    it('should not close nested accordions when opening another parent panel', async () => {
        // Given
        const page = await newE2EPage();
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

        const parentPanels = await page.findAll('#parent-accordion > wcs-accordion-panel');

        // When - Open first parent and its nested panel
        await parentPanels[0].click();
        await page.waitForChanges();

        const firstNestedPanel = await page.find('wcs-accordion > wcs-accordion-panel:first-child wcs-accordion-panel');
        await firstNestedPanel.click();
        await page.waitForChanges();

        // Then
        expect(await parentPanels[0].getProperty('open')).toBe(true);
        expect(await firstNestedPanel.getProperty('open')).toBe(true);

        // When - Open second parent
        await parentPanels[1].click();
        await page.waitForChanges();

        const secondNestedPanel = await page.find('wcs-accordion > wcs-accordion-panel:nth-child(2) wcs-accordion-panel');

        // Then - First parent should close but nested panel state should be preserved
        expect(await parentPanels[0].getProperty('open')).toBe(false);
        expect(await parentPanels[1].getProperty('open')).toBe(true);
        expect(await firstNestedPanel.getProperty('open')).toBe(true); // Nested panel keeps its state
        expect(await secondNestedPanel.getProperty('open')).toBe(false);
    });

    it('should handle deeply nested accordions independently', async () => {
        // Given
        const page = await newE2EPage();
        await setWcsContent(page, `
            <wcs-accordion>
                <wcs-accordion-panel>
                    <wcs-accordion-header>Level 1</wcs-accordion-header>
                    <wcs-accordion-content>
                        <wcs-accordion>
                            <wcs-accordion-panel>
                                <wcs-accordion-header>Level 2</wcs-accordion-header>
                                <wcs-accordion-content>
                                    <wcs-accordion>
                                        <wcs-accordion-panel>
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
        const level1Panel = await page.find('wcs-accordion > wcs-accordion-panel');
        await level1Panel.click();
        await page.waitForChanges();

        const level2Panel = await page.find('wcs-accordion wcs-accordion > wcs-accordion-panel');
        await level2Panel.click();
        await page.waitForChanges();

        const level3Panel = await page.find('wcs-accordion wcs-accordion wcs-accordion > wcs-accordion-panel');
        await level3Panel.click();
        await page.waitForChanges();

        // Then - All levels should be open
        expect(await level1Panel.getProperty('open')).toBe(true);
        expect(await level2Panel.getProperty('open')).toBe(true);
        expect(await level3Panel.getProperty('open')).toBe(true);
    });
});

