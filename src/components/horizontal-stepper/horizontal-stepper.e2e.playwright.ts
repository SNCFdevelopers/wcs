import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-horizontal-stepper · events', () => {
    test('should emit currentStepChange when currentStep changes', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, '');

        await page.evaluate(() => {
            const el = document.createElement('wcs-horizontal-stepper') as any;
            el.currentStep = 1;
            el.steps = [
                { text: 'Step 1', button: { kind: 'Text', text: '1' } },
                { text: 'Step 2', button: { kind: 'Text', text: '2' } },
                { text: 'Step 3', button: { kind: 'Text', text: '3' } }
            ];
            document.body.appendChild(el);
        });

        await page.waitForChanges();

        const stepper = page.locator('wcs-horizontal-stepper');
        const currentStepChangeEventSpy = await stepper.spyOnEvent('currentStepChange');

        await stepper.evaluate((el: any) => {
            el.currentStep = 2;
        });

        await page.waitForChanges();

        expect(currentStepChangeEventSpy).toHaveReceivedEventTimes(1);
        expect(currentStepChangeEventSpy).toHaveReceivedEventDetail(2);
    });

    test('should emit currentStepChange when previous() is called', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, '');

        await page.evaluate(() => {
            const el = document.createElement('wcs-horizontal-stepper') as any;
            el.currentStep = 1;
            el.steps = [
                { text: 'Step 1', button: { kind: 'Text', text: '1' } },
                { text: 'Step 2', button: { kind: 'Text', text: '2' } },
                { text: 'Step 3', button: { kind: 'Text', text: '3' } }
            ];
            document.body.appendChild(el);
        });

        await page.waitForChanges();

        const stepper = page.locator('wcs-horizontal-stepper');
        const currentStepChangeEventSpy = await stepper.spyOnEvent('currentStepChange');

        await stepper.evaluate((el: any) => {
            el.previous();
        });

        await page.waitForChanges();

        expect(currentStepChangeEventSpy).toHaveReceivedEventTimes(1);
        expect(currentStepChangeEventSpy).toHaveReceivedEventDetail(0);
    });

    test('should emit currentStepChange when next() is called', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, '');

        await page.evaluate(() => {
            const el = document.createElement('wcs-horizontal-stepper') as any;
            el.currentStep = 1;
            el.steps = [
                { text: 'Step 1', button: { kind: 'Text', text: '1' } },
                { text: 'Step 2', button: { kind: 'Text', text: '2' } },
                { text: 'Step 3', button: { kind: 'Text', text: '3' } }
            ];
            document.body.appendChild(el);
        });

        await page.waitForChanges();

        const stepper = page.locator('wcs-horizontal-stepper');
        const currentStepChangeEventSpy = await stepper.spyOnEvent('currentStepChange');

        await stepper.evaluate((el: any) => {
            el.next();
        });

        await page.waitForChanges();

        expect(currentStepChangeEventSpy).toHaveReceivedEventTimes(1);
        expect(currentStepChangeEventSpy).toHaveReceivedEventDetail(2);
    });
});
