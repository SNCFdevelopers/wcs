import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

async function appendStepperWithSteps(
    page: E2EPage,
    attributes: Record<string, string>,
    steps: { text: string; disable?: boolean; complete?: boolean; button: { kind: 'Text'; text: string } }[]
) {
    await page.evaluate(
        ({ attributes, steps }) => {
            const el = document.createElement('wcs-horizontal-stepper') as any;
            for (const [name, value] of Object.entries(attributes)) {
                el.setAttribute(name, value);
            }
            el.steps = steps; // set BEFORE connecting to the DOM
            document.body.appendChild(el);
        },
        { attributes, steps }
    );
    await page.waitForChanges();
}

test.describe('wcs-horizontal-stepper · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, '');
        await appendStepperWithSteps(page, { 'current-step': '1' }, [
            { text: 'Étape 1', button: { kind: 'Text', text: '1' } },
            { text: 'Étape 2', button: { kind: 'Text', text: '2' } },
            { text: 'Étape 3', button: { kind: 'Text', text: '3' } },
            { text: 'Étape 4', button: { kind: 'Text', text: '4' } }
        ]);
        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('check-on-complete', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, '');
        await appendStepperWithSteps(page, { 'current-step': '1', 'check-on-complete': '' }, [
            { text: 'Étape 1', button: { kind: 'Text', text: '1' } },
            { text: 'Étape 2', button: { kind: 'Text', text: '2' } },
            { text: 'Étape 3', button: { kind: 'Text', text: '3' } },
            { text: 'Étape 4', disable: true, button: { kind: 'Text', text: '4' } },
            { text: 'Étape 5', button: { kind: 'Text', text: '5' } },
            { text: 'Étape 6', complete: true, button: { kind: 'Text', text: '6' } },
            { text: 'Étape 7', button: { kind: 'Text', text: '7' } }
        ]);
        await expect(page).toHaveScreenshot('check-on-complete.png', { fullPage: true });
    });

    test('mode-linear', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, '');
        await appendStepperWithSteps(page, { 'current-step': '1', mode: 'linear' }, [
            { text: 'Étape 1', button: { kind: 'Text', text: '1' } },
            { text: 'Étape 2', button: { kind: 'Text', text: '2' } },
            { text: 'Étape 3', button: { kind: 'Text', text: '3' } },
            { text: 'Étape 4', disable: true, button: { kind: 'Text', text: '4' } },
            { text: 'Étape 5', button: { kind: 'Text', text: '5' } },
            { text: 'Étape 6', complete: true, button: { kind: 'Text', text: '6' } },
            { text: 'Étape 7', button: { kind: 'Text', text: '7' } }
        ]);
        await expect(page).toHaveScreenshot('mode-linear.png', { fullPage: true });
    });
});
