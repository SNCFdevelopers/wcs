import { newE2EPage } from '@stencil/core/testing';
import { findFocusedNode } from '../../utils/tests';

describe('Tabs component', () => {
    it('Display only first tab if none are preselected', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-tabs>
                <wcs-tab header="1">One</wcs-tab>
                <wcs-tab header="2">Two</wcs-tab>
            </wcs-tabs>
        `);
        const [tab1, tab2] = await page.findAll('wcs-tab');
        // Then
        expect(await tab1.isVisible()).toBe(true);
        expect(await tab2.isVisible()).toBe(false);
    });
    it('Display only second tab if users click on its header', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-tabs>
                <wcs-tab header="1">One</wcs-tab>
                <wcs-tab header="2">Two</wcs-tab>
            </wcs-tabs>
        `);
        const [tab1, tab2] = await page.findAll('wcs-tab');
        const [, tabh2] = await page.findAll('wcs-tabs>>>.wcs-tab-header');
        // When
        await tabh2.click();
        // Then
        expect(await tab1.isVisible()).toBe(false);
        expect(await tab2.isVisible()).toBe(true);
    });
    it('Accept and render new tabs after creation', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
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
            tabsEl.appendChild(tab);
        });
        await page.waitForChanges();
        const [, , h3] = await page.findAll('wcs-tabs>>>.wcs-tab-header');
        const [, , t3] = await page.findAll('wcs-tab');
        // Expect
        expect(h3).toBeDefined();
        expect(t3.innerText).toEqual('Three');
    });
    describe('SelectedKey prop', () => {
        it('should accept a default selected key', async () => {
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs selected-key="custom-2">
                    <wcs-tab item-key="custom-1">One</wcs-tab>
                    <wcs-tab item-key="custom-2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const [tab1, tab2] = await page.findAll('wcs-tab');
            expect(await tab1.isVisible()).toBe(false);
            expect(await tab2.isVisible()).toBe(true);
        });
        it('Allows to change selected tab via prop after creation', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs selected-key="a">
                    <wcs-tab item-key="a">One</wcs-tab>
                    <wcs-tab item-key="b">Two</wcs-tab>
                </wcs-tabs>
            `);
            const tabs = await page.find('wcs-tabs');
            const [tab1, tab2] = await page.findAll('wcs-tab');
            // When
            tabs.setProperty('selectedKey', 'b');
            await page.waitForChanges();
            // Then
            expect(await tab1.isVisible()).toBe(false);
            expect(await tab2.isVisible()).toBe(true);
        });
    })
    describe('SelectedIndex prop', () => {
        it('Accept a default selected tab', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs selected-index="1">
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const [tab1, tab2] = await page.findAll('wcs-tab');
            // Then
            expect(await tab1.isVisible()).toBe(false);
            expect(await tab2.isVisible()).toBe(true);
        });
        it('Allows to change selected tab via prop after creation', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs selected-index="1">
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const tabs = await page.find('wcs-tabs');
            const [tab1, tab2] = await page.findAll('wcs-tab');
            // When
            tabs.setProperty('selectedIndex', 0);
            await page.waitForChanges();
            // Then
            expect(await tab1.isVisible()).toBe(true);
            expect(await tab2.isVisible()).toBe(false);
        });
    });
    describe('Tab change event', () => {
        it('Fires when user clicks on a header', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const tabs = await page.find('wcs-tabs');
            const [, tabh2] = await page.findAll('wcs-tabs>>>.wcs-tab-header');
            const tabsSpy = await tabs.spyOnEvent('tabChange');
            // When
            await tabh2.click();
            await page.waitForChanges();
            // Then
            expect(tabsSpy).toHaveReceivedEventTimes(1);
            expect(tabsSpy).toHaveReceivedEventDetail({tabName: '2', tabIndex: 1});
        });
    });
    describe('Keyboard navigation', () => {
        it('Change selected tab with enter', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const [, h2] = await page.findAll('wcs-tabs>>>.wcs-tab-header');
            const tabs = await page.find('wcs-tabs');
            const tabsSpy = await tabs.spyOnEvent('tabChange');

            // When
            await h2.focus();
            await page.keyboard.press('Enter');
            // Then
            expect(tabsSpy).toHaveReceivedEventTimes(1);
            expect(tabsSpy).toHaveReceivedEventDetail({tabName: '2', tabIndex: 1});
        });
        it('Change selected tab with space', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const [, h2] = await page.findAll('wcs-tabs>>>.wcs-tab-header');
            const tabs = await page.find('wcs-tabs');
            const tabsSpy = await tabs.spyOnEvent('tabChange');
            // When
            await h2.focus();
            await page.keyboard.press('Space');
            // Then
            expect(tabsSpy).toHaveReceivedEventTimes(1);
            expect(tabsSpy).toHaveReceivedEventDetail({tabName: '2', tabIndex: 1});
        });
        it('Move focus with keyboard arrows', async () => {
            // Given
            const page = await newE2EPage();
            await page.setContent(`
                <wcs-tabs>
                    <wcs-tab header="1">One</wcs-tab>
                    <wcs-tab header="2">Two</wcs-tab>
                </wcs-tabs>
            `);
            const [h1] = await page.findAll('wcs-tabs>>>.wcs-tab-header');
            // When
            await h1.focus();
            await h1.press('ArrowRight');
            await page.waitForChanges();
            const accessibilitySnapshot = await page.accessibility.snapshot();
            const focusedNode = findFocusedNode(accessibilitySnapshot);
            // Then
            expect(focusedNode.name).toEqual('2');
        });
    });
});
