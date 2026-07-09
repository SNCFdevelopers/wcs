import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-card · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px;">
                <wcs-card>
                    <wcs-card-body>
                        <wcs-card-header>Titre</wcs-card-header>
                        <wcs-card-content>Contenu</wcs-card-content>
                        <wcs-card-footer>
                            <wcs-button>Action</wcs-button>
                        </wcs-card-footer>
                    </wcs-card-body>
                </wcs-card>
            </div>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('mode-raised', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px;">
                <wcs-card mode="raised">
                    <wcs-card-body>
                        <wcs-card-header>Titre</wcs-card-header>
                        <wcs-card-content>Contenu</wcs-card-content>
                        <wcs-card-footer>
                            <wcs-button>Action</wcs-button>
                        </wcs-card-footer>
                    </wcs-card-body>
                </wcs-card>
            </div>
        `);

        await expect(page).toHaveScreenshot('mode-raised.png', { fullPage: true });
    });

    test('orientation-horizontal', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px;">
                <wcs-card orientation="horizontal">
                    <wcs-card-media>
                        <img src="https://via.placeholder.com/150" />
                    </wcs-card-media>
                    <wcs-card-body>
                        <wcs-card-header>Titre</wcs-card-header>
                        <wcs-card-content>Contenu</wcs-card-content>
                    </wcs-card-body>
                </wcs-card>
            </div>
        `);

        await expect(page).toHaveScreenshot('orientation-horizontal.png', { fullPage: true });
    });

    test('orientation-vertical', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <div style="width: 320px;">
                <wcs-card orientation="vertical">
                    <wcs-card-media>
                        <img src="https://via.placeholder.com/150" />
                    </wcs-card-media>
                    <wcs-card-body>
                        <wcs-card-header>Titre</wcs-card-header>
                        <wcs-card-content>Contenu</wcs-card-content>
                    </wcs-card-body>
                </wcs-card>
            </div>
        `);

        await expect(page).toHaveScreenshot('orientation-vertical.png', { fullPage: true });
    });
});
