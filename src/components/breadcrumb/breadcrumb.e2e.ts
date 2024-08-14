import { newE2EPage } from '@stencil/core/testing';

import { EXPAND_BTN_ARIA_LABEL_DEFAULT } from './breadcrumb-constants';

describe('breadcrumb collapse', () => {
    it('should hide breadcrumb item and respect default values for itemsBeforeCollapse and itemsAfterCollapse props', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        const homeItem = await page.find('.home-item');
        const trainItem = await page.find('.train-item');
        const ticketItem = await page.find('.ticket-item');
        const detail = await page.find('.detail-item');

        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method
        expect(homeItem.getAttribute("slot")).toEqual("items-before-expand-btn");
        expect(trainItem.getAttribute("slot")).toEqual("hidden-items");
        expect(ticketItem.getAttribute("slot")).toEqual("items-after-expand-btn");
        expect(detail.getAttribute("slot")).toEqual("items-after-expand-btn");

    });

    it('should hide breadcrumb item and respect user values for itemsBeforeCollapse and itemsAfterCollapse props', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb max-items="3" items-before-collapse="2" items-after-collapse="1">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        const homeItem = await page.find('.home-item');
        const trainItem = await page.find('.train-item');
        const ticketItem = await page.find('.ticket-item');
        const detail = await page.find('.detail-item');

        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method
        expect(homeItem.getAttribute("slot")).toEqual("items-before-expand-btn");
        expect(trainItem.getAttribute("slot")).toEqual("items-before-expand-btn");
        expect(ticketItem.getAttribute("slot")).toEqual("hidden-items");
        expect(detail.getAttribute("slot")).toEqual("items-after-expand-btn");
    });

    it('shouldn\'t hide breadcrumb item if max item attribute is not defined', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb>
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        const homeItem = await page.find('.home-item');
        const trainItem = await page.find('.train-item');
        const ticketItem = await page.find('.ticket-item');
        const detail = await page.find('.detail-item');

        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method
        expect(homeItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(trainItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(ticketItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(detail.getAttribute("slot")).toEqual("non-collapsed");
    });

    it('sould hide appended breadcrumb item', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        await page.evaluate(() => {
            const breadcrumbItem = document.createElement('wcs-breadcrumb-item');
            breadcrumbItem.classList.add('detail-item');
            breadcrumbItem.textContent = 'Details';
            const breadcrumb = document.querySelector('wcs-breadcrumb');
            breadcrumb.appendChild(breadcrumbItem);
        });

        await page.waitForChanges();

        const homeItem = await page.find('.home-item');
        const trainItem = await page.find('.train-item');
        const ticketItem = await page.find('.ticket-item');
        const detail = await page.find('.detail-item');

        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method
        expect(homeItem.getAttribute("slot")).toEqual("items-before-expand-btn");
        expect(trainItem.getAttribute("slot")).toEqual("hidden-items");
        expect(ticketItem.getAttribute("slot")).toEqual("items-after-expand-btn");
        expect(detail.getAttribute("slot")).toEqual("items-after-expand-btn");
    });

    it('should display all breadcrumb items when the max-items prop is mutated in js', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        const homeItem = await page.find('.home-item');
        const trainItem = await page.find('.train-item');
        const ticketItem = await page.find('.ticket-item');
        const detail = await page.find('.detail-item');

        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method
        expect(homeItem.getAttribute("slot")).toEqual("items-before-expand-btn");
        expect(trainItem.getAttribute("slot")).toEqual("hidden-items");
        expect(ticketItem.getAttribute("slot")).toEqual("items-after-expand-btn");
        expect(detail.getAttribute("slot")).toEqual("items-after-expand-btn");

        const breadcrumb = await page.find('wcs-breadcrumb');
        breadcrumb.setProperty('maxItems', undefined);

        await page.waitForChanges();

        expect(homeItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(trainItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(ticketItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(detail.getAttribute("slot")).toEqual("non-collapsed");
    });

    it('should collapse all breadcrumb items when the max-items prop is mutated in js', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb>
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        const homeItem = await page.find('.home-item');
        const trainItem = await page.find('.train-item');
        const ticketItem = await page.find('.ticket-item');
        const detail = await page.find('.detail-item');

        // We don't use isVisible() because the item is still in the user DOM and the slot style don't seem to be taken
        // into account with the isVisible() method

        expect(homeItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(trainItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(ticketItem.getAttribute("slot")).toEqual("non-collapsed");
        expect(detail.getAttribute("slot")).toEqual("non-collapsed");

        const breadcrumb = await page.find('wcs-breadcrumb');
        breadcrumb.setProperty('maxItems', 3);

        await page.waitForChanges();

        expect(homeItem.getAttribute("slot")).toEqual("items-before-expand-btn");
        expect(trainItem.getAttribute("slot")).toEqual("hidden-items");
        expect(ticketItem.getAttribute("slot")).toEqual("items-after-expand-btn");
        expect(detail.getAttribute("slot")).toEqual("items-after-expand-btn");
    });

    it('should expand collapsed items when user click on expand button', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);

        await page.waitForChanges();

        const nav = await page.find('wcs-breadcrumb >>> nav');
        const expandBtn =
            await page.find(`wcs-breadcrumb >>> button[aria-label="${EXPAND_BTN_ARIA_LABEL_DEFAULT}"]`);
        await expandBtn.click();

        await page.waitForChanges();

        expect(nav).toHaveClass('show-hidden-items');
    });

    it('should update aria-label attribute after the first render', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb>
                <wcs-breadcrumb-item>Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item>Tickets</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);
        const wcsBreadcrumb = await page.find('wcs-breadcrumb');
        await page.waitForChanges();

        // When
        await wcsBreadcrumb.callMethod('setAriaAttribute', 'aria-label', 'new label');
        await page.waitForChanges();

        // Then
        const navEl = wcsBreadcrumb.shadowRoot.querySelector('nav');
        expect(navEl.getAttribute('aria-label')).toBe('new label');
    });

    it('should update expand button aria-label attribute', async () => {
        // Given
        const page = await newE2EPage();
        await page.setContent(`
            <wcs-breadcrumb max-items="3">
                <wcs-breadcrumb-item class="home-item">Home</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="train-item">Train</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="ticket-item">Tickets</wcs-breadcrumb-item>
                <wcs-breadcrumb-item class="detail-item">Details</wcs-breadcrumb-item>
            </wcs-breadcrumb>
        `);
        const wcsBreadcrumb = await page.find('wcs-breadcrumb');
        await page.waitForChanges();

        // When
        const newAriaLabelValue = 'New label';
        wcsBreadcrumb.setProperty('ariaLabelExpandButton', newAriaLabelValue);
        await page.waitForChanges();

        // Then
        const expandBtn =
            await page.find('wcs-breadcrumb >>> button.wcs-inner-button');
        expect(expandBtn.getAttribute('aria-label')).toBe(newAriaLabelValue);
    });
});
