import { newE2EPage } from '@stencil/core/testing';
import { findFocusedNode, setWcsContent } from '../../utils/tests';

describe('Chip component', () => {
    describe('Events', () => {
        it('should emit wcsChipSelectChange with selected=true on click (selectable by default)', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip value="chip-id" label="Chip"></wcs-chip>
            `);

            // When
            const chip = await page.find('wcs-chip');
            const eventSpy = await chip.spyOnEvent('wcsChipSelectChange');
            await chip.click();
            await page.waitForChanges();

            // Then
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy).toHaveReceivedEventDetail({ value: 'chip-id', selected: true });
        });

        it('should toggle selection and emit on Space/Enter (selectable)', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip value="chip-id" label="Chip"></wcs-chip>
            `);
            const chip = await page.find('wcs-chip');
            const eventSpy = await chip.spyOnEvent('wcsChipSelectChange');

            // When - Space selects
            await chip.focus();
            await chip.press('Space');
            await page.waitForChanges();
            // When - Enter toggles back
            await chip.press('Enter');
            await page.waitForChanges();

            // Then
            expect(eventSpy).toHaveReceivedEventTimes(2);
            // Last emitted detail should be selected=false
            const lastDetail = eventSpy.events[eventSpy.events.length - 1].detail;
            expect(lastDetail).toEqual({ value: 'chip-id', selected: false });
        });

        it('should emit wcsChipDismiss when clicking dismiss button (dismissible)', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);
            const chip = await page.find('wcs-chip');
            const dismissBtn = await page.find('wcs-chip>>>button');
            const eventSpy = await chip.spyOnEvent('wcsChipDismiss');

            // When
            await dismissBtn.click();
            await page.waitForChanges();

            // Then
            expect(eventSpy).toHaveReceivedEventTimes(1);
            expect(eventSpy).toHaveReceivedEventDetail({ value: 'chip-id' });
            // open prop should be false -> attribute removed
            expect(chip.getAttribute('open')).toBe(null);
        });
    });

    describe('Keyboard', () => {
        it('Delete/Backspace on dismiss button dismisses the chip', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);
            const chip = await page.find('wcs-chip');
            const dismissBtn = await page.find('wcs-chip>>>button');
            const eventSpy = await chip.spyOnEvent('wcsChipDismiss');

            // When
            await dismissBtn.focus();
            await page.keyboard.press('Delete');
            await page.waitForChanges();

            // Then
            expect(eventSpy).toHaveReceivedEvent();
            expect(chip.getAttribute('open')).toBe(null);
        });
    });

    describe('Accessibility', () => {
        it('exposes proper ARIA for selectable: role=checkbox, aria-checked toggles, tabindex respects disabled', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip value="chip-id" label="Chip"></wcs-chip>
            `);
            const chip = await page.find('wcs-chip');
            // Then default
            expect(chip.getAttribute('role')).toBe('checkbox');
            expect(chip.getAttribute('aria-checked')).toBe('false');
            expect(chip.getAttribute('tabindex')).toBe('0');
            // When
            await chip.click();
            await page.waitForChanges();
            // Then toggled
            expect(chip.getAttribute('aria-checked')).toBe('true');
        });

        it('exposes proper ARIA/disabled for dismissible: button has label and respects disabled', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);
            const btn = await page.find('wcs-chip>>>button');
            // Then
            expect(btn.getAttribute('aria-label')).toBe('Supprimer Chip');

            // When disabled
            const chip = await page.find('wcs-chip');
            chip.setProperty('disabled', true);
            await page.waitForChanges();
            // Then
            expect(chip.getAttribute('aria-disabled')).toBe('true');
            expect(btn.getAttribute('disabled')).not.toBe(null);
        });
    });

    describe('Disabled state', () => {
        it('does not emit select event when disabled (click and Space)', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip disabled value="chip-id" label="Chip"></wcs-chip>
            `);
            const chip = await page.find('wcs-chip');
            const eventSpy = await chip.spyOnEvent('wcsChipSelectChange');

            // When
            await chip.click();
            await chip.press('Space');
            await page.waitForChanges();

            // Then
            expect(eventSpy).not.toHaveReceivedEvent();
            expect(chip.getAttribute('tabindex')).toBe('-1');
            expect(chip.getAttribute('aria-checked')).toBe('false');
        });

        it('does not emit dismiss event when disabled', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <wcs-chip disabled mode="dismissible" value="chip-id" label="Chip"></wcs-chip>
            `);
            const chip = await page.find('wcs-chip');
            const btn = await page.find('wcs-chip>>>button');
            const eventSpy = await chip.spyOnEvent('wcsChipDismiss');

            // When
            await btn.click();
            await page.waitForChanges();

            // Then
            expect(eventSpy).not.toHaveReceivedEvent();
            expect(chip.getAttribute('open')).toBe('');
        });
    });

    describe('Focus management', () => {
        it('after dismiss, focus moves to next actionable chip (selectable host)', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" mode="dismissible" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" value="c2" label="Two"></wcs-chip>
                </div>
            `);
            const btn = await page.find('#c1>>>button');

            // When
            await btn.click();
            await page.waitForChanges();
            const snapshot = await page.accessibility.snapshot();
            const focused = findFocusedNode(snapshot);

            // Then
            expect(focused.name).toBe('Two');
        });

        it('after dismiss, focus moves to next actionable chip (dismissable host)', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" mode="dismissible" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" mode="dismissible" value="c2" label="Two"></wcs-chip>
                </div>
            `);
            const btn = await page.find('#c1>>>button');

            // When
            await btn.click();
            await page.waitForChanges();
            const snapshot = await page.accessibility.snapshot();
            const focused = findFocusedNode(snapshot);
            const c2Button = await page.find('#c2>>>button');

            // Then
            expect(focused.name).toBe(c2Button.getAttribute('aria-label'));
        });

        it('skips disabled chips when moving focus after dismiss', async () => {
            // Given
            const page = await newE2EPage();
            await setWcsContent(page, `
                <div>
                    <wcs-chip id="c1" mode="dismissible" value="c1" label="One"></wcs-chip>
                    <wcs-chip id="c2" disabled value="c2" label="Two"></wcs-chip>
                    <wcs-chip id="c3" value="c3" label="Three"></wcs-chip>
                </div>
            `);
            const btn = await page.find('#c1>>>button');

            // When
            await btn.click();
            await page.waitForChanges();
            const snapshot = await page.accessibility.snapshot();
            const focused = findFocusedNode(snapshot);

            // Then
            expect(focused.name).toBe('Three');
        });
    });
});
