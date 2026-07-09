import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-footer · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-footer>
                <p>Contenu principal du pied de page.</p>
                <span slot="end-left">© 2026 SNCF</span>
                <span slot="end-right"><a href="#">Mentions légales</a></span>
            </wcs-footer>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });
});
