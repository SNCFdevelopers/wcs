import { setWcsContent } from '../../utils/playwright/test';
import { test, E2EPage } from "@stencil/playwright";

import { expect } from "@playwright/test";

test.describe('Com nav', () => {
    test.describe('Keyboard navigation', () => {
        test.describe('Mobile menu', () => {
            test.beforeEach(async ({ page }: { page: E2EPage }) => {
                // Given
                await page.setViewportSize({
                    width: 320,
                    height: 480,
                });

                await setWcsContent(page, `
                 <wcs-com-nav app-name="App Test">
                    <wcs-com-nav-submenu label="Sous menu" panel-title="Sous Menu"
                                         panel-description="Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
                        <wcs-com-nav-item>
                            <a href="#">Loisirs & Tourisme</a>
                        </wcs-com-nav-item>
                        <wcs-com-nav-item>
                            <a href="#">Toutes les lignes</a>
                        </wcs-com-nav-item>
                        <wcs-com-nav-item>
                            <a href="#">Services mobiles</a>
                        </wcs-com-nav-item>
                        <wcs-com-nav-item>
                            <a href="#">Au quotidien</a>
                        </wcs-com-nav-item>
                        <wcs-com-nav-item>
                            <a href="#">Le réseau</a>
                        </wcs-com-nav-item>
                    </wcs-com-nav-submenu>
                    <wcs-com-nav-submenu label="Autre sous menu" panel-title="Autre Sous Menu"
                                         panel-description="Un autre sous menu avec des catégories. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.">
                        <wcs-com-nav-item>
                            <a href="#">Le réseau</a>
                        </wcs-com-nav-item>
                        <wcs-com-nav-category label="Une catégorie">
                            <wcs-com-nav-item>
                                <a href="#">Services mobiles text plus long</a>
                            </wcs-com-nav-item>
                            <wcs-com-nav-item>
                                <a href="#">Au quotidien</a>
                            </wcs-com-nav-item>
                            <wcs-com-nav-item>
                                <a href="#">Le réseau</a>
                            </wcs-com-nav-item>
                        </wcs-com-nav-category>
                        <wcs-com-nav-category label="Une catégorie">
                            <wcs-com-nav-item>
                                <a href="#">1</a>
                            </wcs-com-nav-item>
                            <wcs-com-nav-item>
                                <a href="#">2</a>
                            </wcs-com-nav-item>
                        </wcs-com-nav-category>
                    </wcs-com-nav-submenu>
                    <wcs-com-nav-item id="com-nav-item-last-item">
                        <a href="https://sncf.com" target="_blank">Ressource externe</a>
                    </wcs-com-nav-item>
                    <div slot="actions">
                        <wcs-button mode="clear" class="wcs-dark">Connexion</wcs-button>
                    </div>
                </wcs-com-nav>
            `);
            });

            test('should open menu when press Enter key on mobile menu icon', async ({ page }: { page: E2EPage }) => {
                // When
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press('Enter');
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).toHaveAttribute('data-mobile-open');
            });

            test('should open menu when press Space key on mobile menu icon', async ({ page }: { page: E2EPage }) => {
                // When
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press('Space');
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).toHaveAttribute('data-mobile-open');
            });

            test('should close menu when it opens and press Enter key on mobile menu icon', async ({ page }: { page: E2EPage }) => {
                // Given
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press('Enter');
                await page.waitForChanges();

                // Close the menu
                await page.keyboard.press('Enter');
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).not.toHaveAttribute('data-mobile-open');
            });

            test('should close menu when it opens and press Space key on mobile menu icon', async ({ page }: { page: E2EPage }) => {
                // Given
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press('Space');
                await page.waitForChanges();

                // Close the menu
                await page.keyboard.press('Space');
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).not.toHaveAttribute('data-mobile-open');
            });

            test('should be touchable on mobile and open the menu', async ({ page }: { page: E2EPage }) => {
                // Given
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.click();
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).toHaveAttribute('data-mobile-open');
            });

            test('should close menu when it opens and press escape key anywhere', async ({ page }: { page: E2EPage }) => {
                // Given
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press('Enter');
                await page.waitForChanges();

                // When
                // Navigate on menu
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Escape');
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).not.toHaveAttribute('data-mobile-open');
            });

            test('should close the mobile menu when clicking on a wcs-com-nav-item', async ({ page }: { page: E2EPage }) => {
                // Given
                const menuIcon = page.locator('wcs-com-nav #mobile-menu-icon');
                await menuIcon.click();
                await page.waitForChanges();

                // When
                const navItem = page.locator('#com-nav-item-last-item');
                await navItem.click();
                await page.waitForChanges();

                // Then
                const menu = page.locator('wcs-com-nav .mobile-overlay');
                await expect(menu).not.toHaveAttribute('data-mobile-open');
            });
        });
    });
});
