import { newE2EPage } from "@stencil/core/testing";
import { setWcsContent } from "../../utils/tests";

describe('Checkbox component', () => {
    describe('Events', () => {
        it('should emit a wcsChange event when clicked on wcs-checkbox', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                    <wcs-checkbox name="checkbox-id">
                        Checkbox
                    </wcs-checkbox>
                `);

            // When
            const checkbox = await page.find('wcs-checkbox');
            const eventSpy = await checkbox.spyOnEvent('wcsChange');

            await checkbox.click();
            await page.waitForChanges();

            // Then
            expect(eventSpy)
                .toHaveReceivedEventDetail({
                    checked: true
                });
        });

        it('should emit a wcsChange event when space pressed on wcs-checkbox', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                    <wcs-checkbox name="checkbox-id">
                        Checkbox
                    </wcs-checkbox>
                `);

            // When
            const checkbox = await page.find('wcs-checkbox');
            const eventSpy = await checkbox.spyOnEvent('wcsChange');

            await checkbox.press('Space');
            await page.waitForChanges();

            // Then
            expect(eventSpy)
                .toHaveReceivedEventDetail({
                    checked: true
                });
        });
    });
});
