import { newE2EPage } from "@stencil/core/testing";
import { setWcsContent } from "../../utils/tests";

describe('Switch component', () => {
    describe('Events', () => {
        it('should emit a wcsChange event when clicked on wcs-switch', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                    <wcs-switch name="switch-id">
                        Switch
                    </wcs-switch>
                `);

            // When
            const switchElement = await page.find('wcs-switch');
            const eventSpy = await switchElement.spyOnEvent('wcsChange');

            await switchElement.click();
            await page.waitForChanges();

            // Then
            expect(eventSpy)
                .toHaveReceivedEventDetail({
                    checked: true
                });
        });

        it('should emit a wcsChange event when space pressed on wcs-switch', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                    <wcs-switch name="switch-id">
                        Switch
                    </wcs-switch>
                `);

            // When
            const switchElement = await page.find('wcs-switch');
            const eventSpy = await switchElement.spyOnEvent('wcsChange');

            await switchElement.press('Space');
            await page.waitForChanges();

            // Then
            expect(eventSpy)
                .toHaveReceivedEventDetail({
                    checked: true
                });
        });
    });
});
