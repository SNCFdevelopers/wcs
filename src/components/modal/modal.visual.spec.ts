import { test, E2EPage } from '@stencil/playwright';
import { expect } from '@playwright/test';
import { setWcsContent } from '../../utils/playwright/test';

test.describe('wcs-modal · visual spec', () => {
    test('default', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale pour la capture de régression visuelle.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
                <wcs-button slot="actions" mode="stroked">Annuler</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('default.png', { fullPage: true });
    });

    test('without-backdrop', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show without-backdrop modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale sans backdrop.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('without-backdrop.png', { fullPage: true });
    });

    test('show-close-button', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show show-close-button modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale avec bouton de fermeture.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('show-close-button.png', { fullPage: true });
    });

    test('hide-actions', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show hide-actions modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale sans les actions.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('hide-actions.png', { fullPage: true });
    });

    test('size-s', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show size="s" modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre</span>
                <p>Contenu.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('size-s.png', { fullPage: true });
    });

    test('size-m', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show size="m" modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale pour la capture de régression visuelle.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('size-m.png', { fullPage: true });
    });

    test('size-l', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show size="l" modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale pour la capture de régression visuelle.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('size-l.png', { fullPage: true });
    });

    test('size-xl', async ({ page }: { page: E2EPage }) => {
        await setWcsContent(page, `
            <wcs-modal show size="xl" modal-trigger-controls-id="modal-trigger">
                <span slot="header">Titre de la modale</span>
                <p>Contenu de la modale pour la capture de régression visuelle.</p>
                <wcs-button slot="actions" class="wcs-primary">Valider</wcs-button>
            </wcs-modal>
        `);

        await expect(page).toHaveScreenshot('size-xl.png', { fullPage: true });
    });
});
