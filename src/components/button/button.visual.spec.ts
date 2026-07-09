import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-button · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button>Valider</wcs-button>
            <wcs-button class="wcs-primary">Primary</wcs-button>
            <wcs-button class="wcs-secondary">Secondary</wcs-button>
            <wcs-button class="wcs-success">Success</wcs-button>
            <wcs-button class="wcs-critical">Critical</wcs-button>
            <wcs-button class="wcs-warning">Warning</wcs-button>
            <wcs-button class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('mode-stroked', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button mode="stroked">Valider</wcs-button>
            <wcs-button mode="stroked" class="wcs-primary">Primary</wcs-button>
            <wcs-button mode="stroked" class="wcs-secondary">Secondary</wcs-button>
            <wcs-button mode="stroked" class="wcs-success">Success</wcs-button>
            <wcs-button mode="stroked" class="wcs-critical">Critical</wcs-button>
            <wcs-button mode="stroked" class="wcs-warning">Warning</wcs-button>
            <wcs-button mode="stroked" class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('mode-stroked.png', { fullPage: true });
    });

    test('mode-clear', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button mode="clear">Valider</wcs-button>
            <wcs-button mode="clear" class="wcs-primary">Primary</wcs-button>
            <wcs-button mode="clear" class="wcs-secondary">Secondary</wcs-button>
            <wcs-button mode="clear" class="wcs-success">Success</wcs-button>
            <wcs-button mode="clear" class="wcs-critical">Critical</wcs-button>
            <wcs-button mode="clear" class="wcs-warning">Warning</wcs-button>
            <wcs-button mode="clear" class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('mode-clear.png', { fullPage: true });
    });

    test('shape-round', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button shape="round">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="round" mode="clear" class="wcs-primary">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="round" mode="clear" class="wcs-secondary">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="round" mode="clear" class="wcs-success">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="round" mode="clear" class="wcs-critical">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="round" mode="clear" class="wcs-warning">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="round" mode="clear" class="wcs-info">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
        `);

        await expect(page).toHaveScreenshot('shape-round.png', { fullPage: true });
    });

    test('shape-square', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button shape="square">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="square" mode="clear" class="wcs-primary">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="square" mode="clear" class="wcs-secondary">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="square" mode="clear" class="wcs-success">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="square" mode="clear" class="wcs-critical">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="square" mode="clear" class="wcs-warning">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
            <wcs-button shape="square" mode="clear" class="wcs-info">
                <wcs-mat-icon icon="add"></wcs-mat-icon>
            </wcs-button>
        `);

        await expect(page).toHaveScreenshot('shape-square.png', { fullPage: true });
    });

    test('size-s', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button size="s">Valider</wcs-button>
        `);

        await expect(page).toHaveScreenshot('size-s.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button size="l">Valider</wcs-button>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });

    test('disabled', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button disabled>Valider</wcs-button>
            <wcs-button disabled class="wcs-primary">Primary</wcs-button>
            <wcs-button disabled class="wcs-secondary">Secondary</wcs-button>
            <wcs-button disabled class="wcs-success">Success</wcs-button>
            <wcs-button disabled class="wcs-critical">Critical</wcs-button>
            <wcs-button disabled class="wcs-warning">Warning</wcs-button>
            <wcs-button disabled class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('disabled.png', { fullPage: true });
    });

    test('loading', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button loading>Valider</wcs-button>
            <wcs-button loading class="wcs-primary">Primary</wcs-button>
            <wcs-button loading class="wcs-secondary">Secondary</wcs-button>
            <wcs-button loading class="wcs-success">Success</wcs-button>
            <wcs-button loading class="wcs-critical">Critical</wcs-button>
            <wcs-button loading class="wcs-warning">Warning</wcs-button>
            <wcs-button loading class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('loading.png', { fullPage: true });
    });

    test('with-start-icon', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button start-icon="add">Valider</wcs-button>
            <wcs-button start-icon="add" class="wcs-primary">Primary</wcs-button>
            <wcs-button start-icon="add" class="wcs-secondary">Secondary</wcs-button>
            <wcs-button start-icon="add" class="wcs-success">Success</wcs-button>
            <wcs-button start-icon="add" class="wcs-critical">Critical</wcs-button>
            <wcs-button start-icon="add" class="wcs-warning">Warning</wcs-button>
            <wcs-button start-icon="add" class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('with-start-icon.png', { fullPage: true });
    });

    test('with-end-icon', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-button end-icon="arrow_forward">Valider</wcs-button>
            <wcs-button end-icon="arrow_forward" class="wcs-primary">Primary</wcs-button>
            <wcs-button end-icon="arrow_forward" class="wcs-secondary">Secondary</wcs-button>
            <wcs-button end-icon="arrow_forward" class="wcs-success">Success</wcs-button>
            <wcs-button end-icon="arrow_forward" class="wcs-critical">Critical</wcs-button>
            <wcs-button end-icon="arrow_forward" class="wcs-warning">Warning</wcs-button>
            <wcs-button end-icon="arrow_forward" class="wcs-info">Info</wcs-button>
        `);

        await expect(page).toHaveScreenshot('with-end-icon.png', { fullPage: true });
    });
});
