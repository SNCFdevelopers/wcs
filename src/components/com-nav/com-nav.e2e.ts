import { E2EPage, newE2EPage } from "@stencil/core/testing";
import {KeyInput} from "puppeteer";
import { setWcsContent } from "../../utils/tests";

describe('Com nav', () => {
    describe('Keyboard navigation', () => {
        describe('Mobile menu', () => {
            let page!: E2EPage;
            beforeEach(async () => {
                // Given
                page = await newE2EPage();
                await page.setViewport({
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
            })

            it.each(['Enter', 'Space'])('should open menu when press %s key on mobile menu icon', async (key: KeyInput) => {
                // Given the content is set in beforeEach method

                // When
                const menuIcon = await page.find('wcs-com-nav >>> #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press(key);

                await page.waitForChanges();

                // Then
                const menu = await page.find('wcs-com-nav >>> .mobile-overlay');
                expect(menu).toBeDefined();
                expect(menu).toHaveAttribute('data-mobile-open');
            });

            it.each(['Enter', 'Space'])('should close menu when it opens and press %s key on mobile menu icon', async (key: KeyInput) => {
                // Given
                // the content is set in beforeEach method
                const menuIcon = await page.find('wcs-com-nav >>> #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press(key);

                // Wait for menu to open
                await page.waitForChanges();

                // Close the menu
                await page.keyboard.press(key);
                await page.waitForChanges();

                // Then
                const menu = await page.find('wcs-com-nav >>> .mobile-overlay');
                expect(menu).not.toHaveAttribute('data-mobile-open');
            });

            it('should be touchable on mobile and open the menu', async () => {
                // Given
                // the content is set in beforeEach method
                const menuIcon = await page.find('wcs-com-nav >>> #mobile-menu-icon');
                await menuIcon.tap();

                // Then
                const menu = await page.find('wcs-com-nav >>> .mobile-overlay');
                expect(menu).toBeDefined();
                expect(menu).toHaveAttribute('data-mobile-open');
            });

            it('should close menu when it opens and press escape key anywhere', async () => {
                // Given
                // the content is set in beforeEach method
                const menuIcon = await page.find('wcs-com-nav >>> #mobile-menu-icon');
                await menuIcon.focus();
                await page.keyboard.press('Enter');

                // When
                // Navigate on menu
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Tab');
                await page.keyboard.press('Escape');

                await page.waitForChanges();

                // Then
                const menu = await page.find('wcs-com-nav >>> .mobile-overlay');
                expect(menu).not.toHaveAttribute('data-mobile-open');
            });

            it('should close the mobile menu when clicking on a wcs-com-nav-item', async () => {
                // Given
                const menuIcon = await page.find('wcs-com-nav >>> #mobile-menu-icon');
                await menuIcon.tap();

                // Wait for menu to open
                await page.waitForChanges();

                // When
                const navItem = await page.find('#com-nav-item-last-item');
                await navItem.click();

                await page.waitForChanges();

                // Then
                const menu = await page.find('wcs-com-nav >>> .mobile-overlay');
                expect(menu).not.toHaveAttribute('data-mobile-open');
            });
        });
    });
});
